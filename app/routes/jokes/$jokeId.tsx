import { LoaderFunction, useLoaderData } from 'remix';
import type { Joke } from '@prisma/client';

import { db } from '~/utils/db.server';

// Types
type LoaderData = {
  joke: Joke;
};

// Remix
export let loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });

  if (!joke) throw new Error('Joke not found');

  const data: LoaderData = { joke };

  return data;
};

// React
const JokeId = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
    </div>
  );
};

export default JokeId;
