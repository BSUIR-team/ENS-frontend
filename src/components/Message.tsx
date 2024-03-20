import { useState } from "react";

interface Props {
  items: string[];
  onSelectItem: (item: string) => void;
}

function Message({ items, onSelectItem }: Props) {
  const [selectedItem, setSelectedItem] = useState(-1);
  return (
    <>
      {items.map((item, index) => (
        <h2
          className={selectedItem === index ? "active" : ""}
          onClick={() => {
            setSelectedItem(index);
            onSelectItem(item);
          }}
        >
          {item}
        </h2>
      ))}
    </>
  );
}

export default Message;
