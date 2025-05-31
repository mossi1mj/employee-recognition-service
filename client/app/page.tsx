"use client";

import { Feed } from "@/components/feed";
import { Form } from "@/components/form";
import { Button } from "@heroui/button";
import { MessageSquareShare } from "lucide-react";

export default function Home() {
  return (
    // <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
    <section>
      <div className="container mx-auto px-4 py-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-1">
          <Form />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Feed />
          {/* <RecognitionTable {...recentRecognition} /> */}
        </div>

        <Button
          as="a"
          href="mailto:mossjmyron@gmail.com.com?subject=Feedback for Employee Recognition Platform"
          className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg"
          size="sm"
          color="primary"
          startContent={<MessageSquareShare size={18} />}
        >
          Pilot Feedback
        </Button>
      </div>
    </section>
  );
}
