import { useState } from "react";
import { CloseButton } from "../CloseButton";
import bugImageUrl from './image/bug.svg';
import ideaImageUrl from './image/idea.svg';
import thoughtImageUrl from './image/thought.svg';
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'imagem de um inseto',
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
        alt: 'imagem de uma lampada',
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
        alt: 'imagem de uma nuvem de pensamento',
    }
  },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg">
      { feedbackSent
        ? <FeedbackSuccessStep 
            onFeedbackRestartRequested={ handleRestartFeedback }
          /> 
        :(
          <>
            {!feedbackType
            ? <FeedbackTypeStep onFeedbackTypeChanged={ setFeedbackType } />
            :(
              <FeedbackContentStep
                feedbackType={feedbackType}
                onFeedbackRestartRequested={ handleRestartFeedback }
                onFeedbackSent={() => setFeedbackSent(true)  }
              />
            )}
          </>
        )}

      <footer className="text-xs text-neutral-400">
      Feito com ♥ por <a className="underline underline-offset-2" href="https://www.linkedin.com/in/leonardo-ferraz-149480228/">Ferraz</a> 
      </footer>
    </div>
  )
}