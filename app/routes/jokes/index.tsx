import { Link, LoaderFunction, useLoaderData } from 'remix';
import { Joke } from '@prisma/client';

import { db } from '~/utils/db.server';

// Types
type LoaderData = {
  randomJoke: Joke;
};

// Remix
export let loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);

  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });

  const data: LoaderData = { randomJoke };

  return data;
};

export function ErrorBoundary() {
  return <div className="error-container">I did a whoopsies.</div>;
}

// React
const JokesIndex = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{data.randomJoke.content}</p>
      <Link to={data.randomJoke.id}>"{data.randomJoke.name}" Permalink</Link>
    </div>
  );
};

export default JokesIndex;
