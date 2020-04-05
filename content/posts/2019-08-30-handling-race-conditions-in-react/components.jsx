import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { sample } from 'lodash';

import MobilePhoneView from 'components/MobilePhoneView';

const DemoContainer = ({ children }) => (
  <MobilePhoneView width={350}>
    {children}
  </MobilePhoneView>
);

// TODO extract this constant somewhere
const BaseUrl = Platform.OS !== 'web' ? 'https://sebastienlorber.com/' : '';
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

/*
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
 */

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
  const url = BaseUrl + `starwarsPeople.json?id=${id}`;
  console.debug('url', url);
  const result = await fetch(url, options);
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

const SliderArrowButton = ({ onPress, isNext }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderWidth: 1,
          borderStyle: 'solid',
          width: 40,
          height: 40,
          borderRadius: 25,
          margin: 5,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 30,
          color: 'black',
          borderColor: 'black',
        }}
      >
        <Text>{isNext ? '>' : '<'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SliderContent = ({ children }) => {
  return (
    <View
      style={{
        width: 200,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
        padding: 10,
        margin: 5,
        overflow: 'hidden',
        color: 'black',
        borderColor: 'black',
      }}
    >
      {children}
    </View>
  );
};

const SliderContainer = ({ children }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
      }}
    >
      {children}
    </View>
  );
};

const SlideContent = ({ id, data }) => (
  <View>
    <View>
      <Text>Id={id}</Text>
    </View>
    <View style={{ marginTop: 10 }}>
      <View>
        <Text>Fetched:</Text>
      </View>
      <View>
        <Text>Id: {data ? data.id : '...'}</Text>
      </View>
      <View
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <Text>Name: {data ? data.name : '...'}</Text>
      </View>

      <View>
        <Text>Height: {data ? data.height : '...'}</Text>
      </View>
      <View>
        <Text>Mass: {data ? data.mass : '...'}</Text>
      </View>
    </View>
  </View>
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
      <SliderArrowButton isNext={false} onPress={() => previous()} />
      <SliderContent>
        <SlideContent id={id} data={data} />
      </SliderContent>
      <SliderArrowButton isNext={true} onPress={() => next()} />
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
    <DemoContainer>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </DemoContainer>
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
      .then(
        result => setData(result),
        e => console.warn('fetch failure', e),
      );
  }, [id]);

  return (
    <DemoContainer>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </DemoContainer>
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
      .then(
        result => setData(result),
        e => console.warn('fetch failure', e),
      );
  }, [id]);

  return (
    <DemoContainer>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </DemoContainer>
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
    <DemoContainer>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </DemoContainer>
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
    }).then(async data => {
      await delayRandomly();
      throwRandomly();
      return data;
    });

    currentPromise.then(
      result => setData(result),
      e => console.warn('fetch failure', e),
    );
  }, [id]);

  return (
    <DemoContainer>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </DemoContainer>
  );
};

export const StarwarsHeroSliderAbortingSafe = () => {
  const [id, { previous, next }] = useStarwarsSliderState();

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);

    // Create the current request's abort controller
    const abortController = new AbortController();

    // Issue the request
    fetchStarwarsHeroData(id, {
      signal: abortController.signal,
    })
      // Simulate some delay/errors
      .then(async data => {
        await delayRandomly();
        throwRandomly();
        return data;
      })
      // Set the result, if not aborted
      .then(
        result => {
          // IMPORTANT: we still need to filter the results here,
          // in case abortion happens during the delay.
          // In real apps, abortion could happen when you are parsing the json,
          // with code like "fetch().then(res => res.json())"
          // but also any other async then() you execute after the fetch
          if (abortController.signal.aborted) {
            return;
          }
          setData(result);
        },
        e => console.warn('fetch failure', e),
      );

    // Trigger the abortion in useEffect's cleanup function
    return () => {
      abortController.abort();
    };
  }, [id]);

  return (
    <DemoContainer>
      <StarwarsSlider id={id} data={data} previous={previous} next={next} />
    </DemoContainer>
  );
};
