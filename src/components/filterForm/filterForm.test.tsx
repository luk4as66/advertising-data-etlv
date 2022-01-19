import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import FilterForm from "./filterForm";
import { CampaignRaw } from "../../utils/dataTypes";

const mockData: ReadonlyArray<CampaignRaw> = [
  {
    Date: "03.03.2020",
    Datasource: "source1",
    Clicks: 12,
    Campaign: "campaign1",
    Impressions: 4,
  },
  {
    Date: "25.02.2022",
    Datasource: "source3",
    Clicks: 2,
    Campaign: "campaign3",
    Impressions: 1,
  },
  {
    Date: "25.03.2022",
    Datasource: "source3",
    Clicks: 32,
    Campaign: "campaign4",
    Impressions: 23,
  },
  {
    Date: "01.02.2019",
    Datasource: "source2",
    Clicks: 34,
    Campaign: "campaign2",
    Impressions: 23,
  },
];

const mockDataSources = ["source3", "source2", "source1"];
const mockCampaigns = ["campaign3", "campaign2", "campaign4", "campaign1"];

const mockOnApply = jest.fn();

describe("FilterForm", () => {
  test("should render correctly ", async () => {
    render(
      <FilterForm
        campaignsNames={mockCampaigns}
        dataSources={mockDataSources}
        data={mockData}
        onApply={mockOnApply}
      />
    );
    const labelDataSource = screen.getByText("Datasource");
    const labelCampaigns = screen.getByText("Campaigns");
    const allChip = screen.getAllByText("All");
    expect(labelDataSource).toBeInTheDocument();
    expect(labelCampaigns).toBeInTheDocument();
    expect(allChip).toHaveLength(2);
  });

  test("should call onApply with all ", async () => {
    render(
      <FilterForm
        campaignsNames={mockCampaigns}
        dataSources={mockDataSources}
        data={mockData}
        onApply={mockOnApply}
      />
    );
    fireEvent.click(screen.getByTestId("apply"));

    expect(mockOnApply).toBeCalledWith(
      ["source3", "source2", "source1"],
      ["campaign3", "campaign2", "campaign4", "campaign1"]
    );
  });

  test("should change datasource ", async () => {
    render(
      <FilterForm
        campaignsNames={mockCampaigns}
        dataSources={mockDataSources}
        data={mockData}
        onApply={mockOnApply}
      />
    );

    const datasourceSelect = within(screen.getByTestId("datasource-select"));
    fireEvent.mouseDown(datasourceSelect.getByRole("button"));
    await screen.getByRole("listbox");
    fireEvent.click(screen.getByText("source3"));

    fireEvent.click(screen.getByTestId("apply"));

    expect(mockOnApply).toBeCalledWith(
      ["source2", "source1"],
      ["campaign1", "campaign2"]
    );
  });

  test("should change campaigns ", async () => {
    render(
      <FilterForm
        campaignsNames={mockCampaigns}
        dataSources={mockDataSources}
        data={mockData}
        onApply={mockOnApply}
      />
    );

    const datasourceSelect = within(screen.getByTestId("campaigns-select"));
    fireEvent.mouseDown(datasourceSelect.getByRole("button"));
    await screen.getByRole("listbox");
    fireEvent.click(screen.getByText("campaign3"));

    fireEvent.click(screen.getByTestId("apply"));

    expect(mockOnApply).toBeCalledWith(
      ["source3", "source2", "source1"],
      ["campaign2", "campaign4", "campaign1"]
    );
  });
});
