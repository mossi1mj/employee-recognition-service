"use client";

import { ApplauseForm } from "@/components/form";
import { useApplauses } from "@/hooks/useApplauses";
import { Button } from "@heroui/button";
import { MessageSquareShare } from "lucide-react";

export default function Home() {
  const { data, loading, error } = useApplauses({
    senderId: null,
    recipientId: null,
  });

  console.log("Applause Data:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);
  return (
    // <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
    <section>
      <div className="container mx-auto px-4 py-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-1">
          <ApplauseForm />
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* <ApplauseFeed />
          <ApplauseTable {...recentApplause} /> */}
          test
        </div>

        <Button
          as="a"
          href="mailto:ApplauseFeedback@Ally.com?subject=Feedback for Ally Applause"
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
