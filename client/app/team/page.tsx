"use client";

import { Table } from "@/components/table";
import { Button, Card, CardBody, Spinner } from "@heroui/react";
import { ArrowLeft, Link } from "lucide-react";
import { Suspense } from "react";

const DataLoad = () => (
  <div className="max-w-5xl mx-auto px-4 py-6">
    <Card>
      <CardBody className="flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" color="secondary" />
          <p className="text-default-500">Loading Team ...</p>
        </div>
      </CardBody>
    </Card>
  </div>
);

const Error = ({ message }: { message: string }) => (
  <div className="max-w-3xl mx-auto px-4 py-6">
    <Card className="w-full border-danger-200">
      <CardBody className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <div className="text-danger text-4xl">!</div>
        <h2 className="text-xl font-semibold">Unable to load team data</h2>
        <p className="text-default-500 text-center">{message}</p>
        <Link href="/my-applause">
          <Button
            color="primary"
            variant="solid"
            startContent={<ArrowLeft size={16} />}
          >
            Return to Recognitions
          </Button>
        </Link>
      </CardBody>
    </Card>
  </div>
);

const TeamOverview: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-3" id="team-summary">
      <div className="mb-6 flex justify-between items-center">
        <div id="team-overview">
          <h1 className="text-2xl font-bold">Team Overview</h1>
          <p className="text-default-500">
            View recognition activity of your team members
          </p>
        </div>
      </div>

      <Suspense fallback={<DataLoad />}>
        <Table />
      </Suspense>
    </div>
  );
};

export default TeamOverview;
