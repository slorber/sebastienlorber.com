import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { sample } from 'lodash';

/*
const fetchStarwarsHeroData = async (id, options) => {
  const result = await fetch(`https://swapi.co/api/people/${id}/`, options);
  if (result.status !== 200) {
    throw new Error('bad status = ' + result.status);
  }
  return result.json().then(data => ({
    ...data,
    id,
  }));
};
*/

console.debug('---------------------------------------------------');
console.debug('---------------------------------------------------');
console.warn('-- Sebastien here:');
console.warn(
  '-- If you are looking at the console logs and network, take into consideration I had to replace the swapi.co public API beacause it was throttling the demos. I tried to emulate a real SW api by hosting a static json file on netlift, and reimplementing some kind of weird in-flight request abortion',
);
console.warn(
  "-- So it's normal if you see some unexpected things in the network tab like a single route always returning the same response: an array of all SW heros",
);
console.debug('---------------------------------------------------');
console.debug('---------------------------------------------------');

const delayPromise = timeout =>
  new Promise(resolve => setTimeout(resolve, timeout));

/*
// TODO fake SW api because the official one is often not reliable :/
// using a fake static json file on netlify to emulate the real api...
const fetchStarwarsHeroData = async (id, options) => {
  // Fake a bit some network delay, because the api is "static" and self hosted, it's noo fast...
  await delayPromise(sample([0, 100, 300, 500, 700, 1000]));

  // Shitty workaround to make abortion work despite the fake delay...
  const isAbortedBeforeFetch = !!(
    options &&
    options.signal &&
    options.signal.aborted
  );
  const abortController = new AbortController();
  if ( options && options.signal ) {
    options.signal.addEventListener("abort",() => {
      console.debug("abortion listener");
      abortController.abort();
    })
  }

  const promise = fetch(`starwarsPeople.json?id=${id}`, {
    signal: abortController.signal,
  });

  if (isAbortedBeforeFetch) {
    console.debug('aborting!');
    abortController.abort();
  }

  const result = await promise;
  if (result.status !== 200) {
    throw new Error('bad status = ' + result.status);
  }
  const data = await result.json();
  const item = data.find(hero => hero.pk === id);
  if (!item) {
    throw new Error('starwars hero not found for id =' + id);
  }
  return {
    id,
    ...item.fields,
  };
};
 */

// TODO fake SW api because the official one is often not reliable :/
// using a fake static json file on netlify to emulate the real api...
const fetchStarwarsHeroData = async (id, options) => {
  const result = await fetch(`starwarsPeople.json?id=${id}`, options);
  if (result.status !== 200) {
    throw new Error('bad status = ' + result.status);
  }
  const data = await result.json();
  const item = data.find(hero => hero.pk === id);
  if (!item) {
    throw new Error('starwars hero not found for id =' + id);
  }
  return {
    id,
    ...item.fields,
  };
};

const SliderArrowButton = styled.button(
  {
    borderStyle: 'solid',
    width: 40,
    height: 40,
    borderRadius: 25,
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 30,
  },
  props => ({
    color: props.theme.colors.articleText,
    borderColor: props.theme.colors.articleText,
  }),
);

const SliderContent = styled.div(
  {
    width: 200,
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 10,
    margin: 5,
    overflow: 'hidden',
  },
  props => ({
    color: props.theme.colors.articleText,
    borderColor: props.theme.colors.articleText,
  }),
);

const SliderContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  padding: 10,
});

const SlideContent = ({ id, data }) => (
  <div>
    <div>Id={id}</div>
    <div css={{ marginTop: 10 }}>
      <div>Fetched:</div>
      <div>Id: {data ? data.id : '...'}</div>
      <div
        css={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        Name: {data ? data.name : '...'}
      </div>
      <div>Height: {data ? data.height : '...'}</div>
      <div>Mass: {data ? data.mass : '...'}</div>
    </div>
  </div>
);

const useStarwarsSliderState = () => {
  const [id, setId] = useState(1);

  const api = useMemo(() => {
    return {
      previous: () => setId(i => (i > 2 ? i - 1 : i)),
      next: () => setId(i => i + 1),
    };
  }, [setId]);

  return [id, api];
};

const StarwarsSlider = ({ id, data, previous, next }) => {
  return (
    <SliderContainer>
      <SliderArrowButton onClick={() => previous()}>{'<'}</SliderArrowButton>
      <SliderContent>
        <SlideContent id={id} data={data} />
      </SliderContent>
      <SliderArrowButton onClick={() => next()}>{'>'}</SliderArrowButton>
    </SliderContainer>
  );
};

const delayRandomly = () => {
  return delayPromise(sample([0, 200, 500, 700, 1000, 3000]));
};

const throwRandomly = () => {
  const shouldThrow = sample([true, false, false, false, false]);
  if (shouldThrow) {
    throw new Error('simulated async failure');
  }
};

export const StarwarsHeroSliderDefault = () => {
  const [id, { previous, next }] = useStarwarsSliderState();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    fetchStarwarsHeroData(id).then(
      result => setData(result),
      e => console.warn('fetch failure', e),
    );
  }, [id]);

  return (
    <div css={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </div>
  );
};

export const StarwarsHeroSliderDelay = () => {
  const [id, { previous, next }] = useStarwarsSliderState();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    fetchStarwarsHeroData(id)
      .then(async data => {
        await delayRandomly();
        return data;
      })
      .then(result => setData(result), e => console.warn('fetch failure', e));
  }, [id]);

  return (
    <div css={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </div>
  );
};

export const StarwarsHeroSliderDelayThrow = () => {
  const [id, { previous, next }] = useStarwarsSliderState();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    fetchStarwarsHeroData(id)
      .then(async data => {
        await delayRandomly();
        throwRandomly();
        return data;
      })
      .then(result => setData(result), e => console.warn('fetch failure', e));
  }, [id]);

  return (
    <div css={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </div>
  );
};

export const StarwarsHeroSliderIgnoring = () => {
  const [id, { previous, next }] = useStarwarsSliderState();
  const [data, setData] = useState(null);

  const lastPromise = useRef();

  useEffect(() => {
    setData(null);
    const currentPromise = fetchStarwarsHeroData(id).then(async data => {
      await delayRandomly();
      throwRandomly();
      return data;
    });

    lastPromise.current = currentPromise;

    currentPromise.then(
      result => {
        if (currentPromise === lastPromise.current) {
          setData(result);
        }
      },
      e => {
        if (currentPromise === lastPromise.current) {
          console.warn('fetch failure', e);
        }
      },
    );
  }, [id]);

  return (
    <div css={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </div>
  );
};

export const StarwarsHeroSliderAborting = () => {
  const [id, { previous, next }] = useStarwarsSliderState();
  const [data, setData] = useState(null);

  // Store abort controller which will permit to abort the last issued request
  const lastAbortController = useRef();

  useEffect(() => {
    setData(null);

    // When a new request is going to be issued, the first thing to do is cancel the previous request
    if (lastAbortController.current) {
      lastAbortController.current.abort();
    }

    // Create new AbortController for the new request and store it in the ref
    const currentAbortController = new AbortController();
    lastAbortController.current = currentAbortController;

    // Issue the new request, that may eventually be aborted by a subsequent request
    const currentPromise = fetchStarwarsHeroData(id, {
      signal: currentAbortController.signal,
    }).then(data => {
      // You might notice I had to remove the bad network simulation code:
      // this is because it's not possible to abort this part of the code with the abort signal
      return data;
    });

    currentPromise.then(
      result => setData(result),
      e => console.warn('fetch failure', e),
    );
  }, [id]);

  return (
    <div css={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </div>
  );
};
