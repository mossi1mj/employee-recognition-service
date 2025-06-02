import { Key, useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { UserRoundSearch } from "lucide-react";

import { useUserSearch } from "@/hooks/useUserSearch";
import { useRecognitionForm } from "@/context/FormContext";

const Input: React.FC = () => {
  const { results, search, isLoading } = useUserSearch();
  const { input, setInput, setRecipientId } = useRecognitionForm();
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  const handleSelection = (key: Key | null) => {
    setSelectedKey(key as string | null);

    if (key === null) return;

    const selected = results.find((u) => u.id.toString() === key);

    if (selected) {
      setRecipientId(selected.id);
      setInput(`${selected.firstName} ${selected.lastName}`);
    }
  };

  useEffect(() => {
    if (input.length > 1) {
      search(input);
    }
  }, [input, search]);

  return (
    <Autocomplete
      isRequired
      inputValue={input}
      isLoading={isLoading}
      items={results.map((user) => ({
        key: user.id.toString(),
        label: `${user.firstName} ${user.lastName}`,
      }))}
      label="Employee"
      labelPlacement="outside"
      placeholder="Who's the employee superstar?"
      selectedKey={selectedKey}
      startContent={<UserRoundSearch color="gray" />}
      variant="underlined"
      onInputChange={setInput}
      onSelectionChange={handleSelection}
    >
      {(item) => (
        <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Input;
