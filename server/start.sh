#!/bin/bash

# Start the FastAPI server for Render
uvicorn app.main:app --host=0.0.0.0 --port=8000
