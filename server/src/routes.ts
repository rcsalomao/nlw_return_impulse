import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  // prisma.feedback.create({
  //   data: {
  //     type: req.body.type,
  //     comment: req.body.comment,
  //     screenshot: req.body.screenshot,
  //   },
  // });

  const { type, comment, screenshot } = req.body;
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );
  await submitFeedbackUseCase.execute({ type, comment, screenshot });
  // const feedback = await submitFeedbackUseCase.execute({ type, comment, screenshot });

  // return res.status(201).json({ data: feedback });
  return res.status(201).send();
});
