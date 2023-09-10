import { ChangeEvent, useState } from "react";

const getWords = (str: string) => str.trim().split(" ").filter(Boolean);

const getWordsLength = (str: string) => getWords(str).length;

const getCharsWithSpace = (str: string) => str.length;

const getCharsWithoutSpace = (str: string) =>
  getWords(str)
    .map(word => word.length)
    .reduce((prev, current) => prev + current, 0);

function App() {
  const [text, setText] = useState<string>("");

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => setText(value);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="max-w-lg w-full p-6 mb-48">
        <header className="mb-4">
          <h1 className="text-xl font-bold">
            Contador de Caracteres{" "}
            <span className="font-normal">e Palavras</span>
          </h1>
        </header>

        <textarea
          cols={30}
          rows={10}
          placeholder="Digite o texto aqui"
          value={text}
          onChange={handleChange}
          className="w-full resize-none outline-none rounded p-3 border"
        />

        <footer className="mt-2 leading-8">
          Caracteres (sem espaços): {getCharsWithoutSpace(text)}
          <br />
          Caracteres (com espaços): {getCharsWithSpace(text)}
          <br />
          Palavras: {getWordsLength(text)}
        </footer>
      </div>
    </main>
  );
}

export default App;
