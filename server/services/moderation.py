from dotenv import load_dotenv
import os
import logging
import asyncio
from fastapi import HTTPException
from openai import OpenAI
from better_profanity import profanity

# Configure logging: logs to console and file
logger = logging.getLogger("moderation")
logger.setLevel(logging.DEBUG)  # Change to INFO or WARNING in production

# Console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
console_formatter = logging.Formatter('[%(levelname)s] %(message)s')
console_handler.setFormatter(console_formatter)

# File handler
file_handler = logging.FileHandler("moderation.log")
file_handler.setLevel(logging.INFO)
file_formatter = logging.Formatter('%(asctime)s - [%(levelname)s] %(message)s')
file_handler.setFormatter(file_formatter)

logger.addHandler(console_handler)
logger.addHandler(file_handler)

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("OPENAI_API_KEY environment variable is not set")

client = OpenAI(api_key=api_key)

profanity.load_censor_words()

async def check_message_moderation(message: str):
    if not message or message.strip() == "":
        logger.debug("Empty or blank message detected; skipping moderation.")
        return
    
    logger.info(f"Checking message for moderation: {message}")

    try:
        if profanity.contains_profanity(message):
            flagged_words = [word for word in message.split() if profanity.contains_profanity(word)]
            logger.warning(f"Profanity detected: {flagged_words}")
            raise HTTPException(
                status_code=400,
                detail="Inappropriate language detected. This violates our content standards and is not permitted."
            )
        
        # Run blocking call in a thread to avoid blocking async loop
        response = await asyncio.to_thread(lambda: client.moderations.create(input=message))

        results = response.results[0]
        flagged = results.flagged
        categories = results.categories


        if flagged:
            logger.warning(f"Message flagged for moderation: categories={categories}")
            violated_categories = [cat for cat, is_flagged in categories.__dict__.items() if is_flagged]
            raise HTTPException(
                status_code=400,
                detail=(
                f"Message content violates moderation policies. "
                f"Contains: {', '.join(violated_categories)}"
            )
            )
        else:
            logger.info("Message passed moderation.")

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during moderation check: {e}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error during moderation check."
        )