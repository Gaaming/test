import { Icon } from "azure-devops-ui/Icon";
import { ListSelection } from "azure-devops-ui/List";
import { ListBox } from "azure-devops-ui/ListBox";
import { SimpleTableCell } from "azure-devops-ui/Table";
import * as React from "react";
import { FilterInput } from "../Components/FilterInput";
import { HoverlayButton } from "../Components/HoverlayButton";
import { Label } from "../Components/Label";
import { Popover } from "../Components/Popover";

let id = 0;
const items = [
  { id: id++, text: "Canberra" },
  { id: id++, text: "Belmopan" },
  { id: id++, text: "Porto-Novo" },
  { id: id++, text: "Sucre" },
  { id: id++, text: "Brasília" },
  { id: id++, text: "Gitega" },
  { id: id++, text: "Yaoundé" },
  { id: id++, text: "Ottawa" },
  { id: id++, text: "Beijing" },
  { id: id++, text: "Yamoussoukro" },
  { id: id++, text: "Malabo" },
  { id: id++, text: "New Delhi" },
  { id: id++, text: "Astana" },
  { id: id++, text: "Vaduz" },
  { id: id++, text: "Valletta" }
];

const StateValue: React.FC = props => {
  return (
    <div className="field-value body-l font-weight-semibold">
      {props.children}
    </div>
  );
};

export default () => {
  const [filter, setFilter] = React.useState("");
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const buttonRef = React.useRef<HTMLDivElement>();

  return (
    <>
      <HoverlayButton anchorRef={buttonRef} onClick={() => setIsOpen(true)}>
        <Label className="body-s">Some Field</Label>
        <StateValue>{items[selectedIdx].text}</StateValue>
      </HoverlayButton>
      {isOpen && (
        <Popover
          onDismiss={() => setIsOpen(false)}
          anchorElement={buttonRef.current}
          contentProps={{
            selectedIdx,
            onSelect: (idx: number) => {
              setSelectedIdx(idx);
              setIsOpen(false);
            },
            label: "Some Field",
            additionalHeaderContent: (
              <div className="bolt-dropdown-filter-container bolt-dropdown-filter">
                <FilterInput filter={filter} setFilter={setFilter} />
              </div>
            ),
            content: (
              <ListBox
                items={
                  items.filter(
                    x =>
                      !filter ||
                      x.text
                        .toLocaleLowerCase()
                        .indexOf(filter.toLocaleLowerCase()) >= 0
                  ) as any
                }
                renderItem={(rowIdx, colIdx, column, item) => {
                  return (
                    <SimpleTableCell
                      className="list-item flex-center"
                      columnIndex={colIdx}
                      tableColumn={column}
                      key={item.id}
                    >
                      <div className="list-selection flex-row justify-center flex-center">
                        {selectedIdx === +item.id && (
                          <Icon iconName="CheckMark" />
                        )}
                      </div>
                      {item.text}
                    </SimpleTableCell>
                  );
                }}
                selection={
                  new ListSelection({
                    selectedRanges: [
                      {
                        beginIndex: selectedIdx,
                        endIndex: selectedIdx
                      }
                    ]
                  })
                }
                onSelect={(_: any, item) => {
                  setSelectedIdx(+item.id);
                  setIsOpen(false);
                }}
              />
            )
          }}
        />
      )}
    </>
  );
};
