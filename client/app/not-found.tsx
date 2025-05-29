"use client";

import { motion } from "framer-motion";
import { Button, Card } from "@heroui/react";
import { BadgeHelp } from "lucide-react";

export default function Custom404() {
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-8">
        <motion.div
          className="text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-4">
            Uh Oh, Something&apos;s wrong here...
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Instead of clapping our hands, looks like we stomped our feet.
          </p>
          <Button
            as="a"
            href="mailto:mossjmyron@gmail.com?subject=Feedback for Employee Recognition Application"
            color="primary"
            size="md"
            startContent={<BadgeHelp size={20} />}
          >
            Help
          </Button>
        </motion.div>
      </Card>
    </div>
  );
}
