"use client";

import { Card, CardBody, Spinner } from "@heroui/react";
import { Suspense } from "react";

import { Table } from "@/components/table";

const DataLoad = () => (
  <div className="max-w-5xl mx-auto px-4 py-6">
    <Card>
      <CardBody className="flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner color="secondary" size="lg" />
          <p className="text-default-500">Loading Team ...</p>
        </div>
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
