import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const createMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  // { create: async () => {} },
  // { sendMail: async () => {} }
  { create: createFeedbackSpy },
  { sendMail: createMailSpy }
);

describe("Submit feedbacks", () => {
  it("Should be able to submit feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Tá pegando fogo bixo!!",
        screenshot: "data:image/png;base64,Blksdjflksjlfkjls",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(createMailSpy).toHaveBeenCalled();
  });

  it("Should not be able to submit feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Tá pegando fogo bixo!!",
        screenshot: "data:image/png;base64,Blksdjflksjlfkjls",
      })
    ).rejects.toThrow();
  });

  it("Should not be able to submit feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,Blksdjflksjlfkjls",
      })
    ).rejects.toThrow();
  });

  it("Should not be able to submit feedback with a wrong image format.", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Tá pegando fogo bixo!!",
        screenshot: "test_image.jpg",
      })
    ).rejects.toThrow();
  });
});
