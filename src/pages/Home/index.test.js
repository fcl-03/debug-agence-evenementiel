import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

const mockData = {
  events: [
    {
      id: 1,
      type: "conférence",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #test",
      cover: "/images/test.png",
      description: "Description test",
      nb_guesses: 100,
      periode: "24-25-26 Avril",
      prestations: ["1 scène principale"],
    },
  ],
  focus: [
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/test.png",
    },
  ],
};

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findAllByText("Conférence #test");
  });
  it("a list a people is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Samira");
  });
  it("a footer is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Notre dernière prestation");
  });
  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("boom");
  });
});
