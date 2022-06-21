import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  // private feedbacksRepository: FeedbacksRepository;
  // constructor(feedbacksRepository: FeedbacksRepository) {
  //   this.feedbacksRepository = feedbacksRepository;
  // }
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required.");
    }

    if (!comment) {
      throw new Error("Comment is required.");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });
    await this.mailAdapter.sendMail({
      subject: "Tem feedback para vc S2!!",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color:#111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot
          ? `<img src="${screenshot}" alt="screenshot do feedback" width="800" height="600"/>`
          : null,
        `</div>`,
      ].join("\n"),
    });
    // const feedback = await this.feedbacksRepository.create({ type, comment, screenshot });
    // return feedback;
  }
}
