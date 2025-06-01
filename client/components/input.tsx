import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { UserRoundSearch } from "lucide-react";

import { useUserSearch } from "@/hooks/useUserSearch";
import { useRecognitionForm } from "@/context/FormContext";

const Input: React.FC = () => {
  const { results, search, isLoading } = useUserSearch();
  const { setRecipientId } = useRecognitionForm();
  const [inputValue, setInputValue] = useState("");

  const handleSelection = (key: React.Key | null) => {
    if (key === null) return;

    const selected = results.find((u) => u.id.toString() === key);

    if (selected) {
      setRecipientId(selected.id);
    }
  };

  useEffect(() => {
    if (inputValue.length > 1) {
      search(inputValue);
    }
  }, [inputValue, search]);

  return (
    <Autocomplete
      isRequired
      inputValue={inputValue}
      isLoading={isLoading}
      items={results.map((user) => ({
        key: user.id.toString(),
        label: `${user.firstName} ${user.lastName}`,
      }))}
      label="Employee"
      labelPlacement="outside"
      placeholder="Who's the employee superstar?"
      startContent={<UserRoundSearch color="gray" />}
      variant="underlined"
      onInputChange={setInputValue}
      onSelectionChange={handleSelection}
    >
      {(item) => (
        <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Input;
