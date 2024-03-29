import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { FeedbackType, feedbackTypes } from "../Index";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackSent: () => void;
  onFeedbackRestartRequested: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {
const [screenshot, setScreenshot] = useState('');
const [comment, setComment] = useState('');
const [isSendingFeeback, setIsSendingFeedback] = useState(false);

const feedbackTypeInfo = feedbackTypes[feedbackType];

async function handleSubmitFeedback(e: FormEvent) {
  e.preventDefault();
  setIsSendingFeedback(true);

  await api.post('/feedbacks', {
    type: feedbackType,
    comment,
    screenshot,
  })

  setIsSendingFeedback(false)
  onFeedbackSent();
}

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2 mx-10">
          <img
            src={ feedbackTypeInfo.image.source }
            alt={ feedbackTypeInfo.image.alt }
            className="w-6 h-6"
          />
          { feedbackTypeInfo.title }
        </span>

        <CloseButton />
      </header>
      <form
        className="my-4 w-full"
        onSubmit={ handleSubmitFeedback }
      >
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-100 focus:ring-brand-100 focus-ring-1 focus:outline-none resize-none scroolbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes oque esta acontecendo..."
          onChange={({ target }) => setComment(target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton 
            screenshot={ screenshot }
            onScreenshotTook={ setScreenshot }
          />

          <button
            type="submit"
            disabled={comment.length == 0 || isSendingFeeback}
            className="p-2 bg-brand-100 text-zinc-800 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-100 transition-colors disabled:opacity-50 disabled:hover:bg-brand-100"
          >
            {isSendingFeeback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
