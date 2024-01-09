import Page from "../../app/page";

describe("Page", () => {
  it("renders a navbar", () => {
    render(<Page />);

    const navigation = screen.getByRole("navigation"); 

    expect(heading).toBeInTheDocument();
  });

  
}
);