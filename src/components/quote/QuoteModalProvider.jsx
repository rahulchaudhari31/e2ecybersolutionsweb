import { createContext, useCallback, useContext, useMemo, useState } from "react";
import QuoteModal from "./QuoteModal";

const QuoteModalContext = createContext(null);

export function QuoteModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("general");

  const openQuote = useCallback((nextSource = "general") => {
    setSource(nextSource);
    setOpen(true);
  }, []);

  const closeQuote = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, source, openQuote, closeQuote }),
    [open, source, openQuote, closeQuote]
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal open={open} onClose={closeQuote} source={source} />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used inside QuoteModalProvider");
  }
  return context;
}
