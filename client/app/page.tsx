"use client";

import { Button } from "@heroui/button";
import { MessageSquareShare } from "lucide-react";

import { Feed } from "@/components/feed";
import { Form } from "@/components/form";

export default function Home() {
  return (
    <section>
      <div className="container mx-auto px-4 py-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-1">
          <Form />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Feed />
        </div>

        <Button
          as="a"
          className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg"
          color="primary"
          href="mailto:mossjmyron@gmail.com.com?subject=Feedback for Employee Recognition Platform"
          size="sm"
          startContent={<MessageSquareShare size={18} />}
        >
          Pilot Feedback
        </Button>
      </div>
    </section>
  );
}
