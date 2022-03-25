import { Link, LoaderFunction, useCatch, useLoaderData } from 'remix';
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

  if (!randomJoke) {
    throw new Response('No random joke found', {
      status: 404,
    });
  }

  const data: LoaderData = { randomJoke };

  return data;
};

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div className="error-container">There are no jokes to display.</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

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
