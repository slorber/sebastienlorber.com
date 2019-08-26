import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const fetchStarwarsHeroData = async id => {
  const result = await fetch(`https://swapi.co/api/people/${id}/`);
  if (result.status !== 200) {
    throw new Error('bad status = ' + result.status);
  }
  return result.json().then(data => ({
    ...data,
    id,
  }));
};

const SliderArrowButton = styled.button(
  {
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
  },
  props => ({
    color: props.theme.colors.articleText,
    borderColor: props.theme.colors.articleText,
  }),
);

const SliderContent = styled.div(
  {
    width: 300,
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 10,
    margin: 10,
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

const StarwarsSlider = ({ component: Component }) => {
  const [id, setId] = useState(1);
  return (
    <SliderContainer>
      <SliderArrowButton onClick={() => setId(i => (i > 2 ? i - 1 : i))}>
        {'<'}
      </SliderArrowButton>
      <SliderContent>
        <Component id={id} />
      </SliderContent>
      <SliderArrowButton onClick={() => setId(i => i + 1)}>
        {'>'}
      </SliderArrowButton>
    </SliderContainer>
  );
};

const StarwarsHeroSlideContent = ({ id, data }) => (
  <div>
    <div>Id={id}</div>
    <div css={{ marginTop: 10 }}>
      <div>Fetched:</div>
      <div>Id: {data ? data.id : '...'}</div>
      <div>Name: {data ? data.name : '...'}</div>
      <div>Height: {data ? data.height : '...'}</div>
      <div>Mass: {data ? data.mass : '...'}</div>
    </div>
  </div>
);

const StarwarsHeroBase = ({ id }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(null);
    fetchStarwarsHeroData(id).then(
      result => setData(result),
      e => console.warn('fetch failure', e),
    );
  }, [id]);
  return <StarwarsHeroSlideContent id={id} data={data} />;
};

export const StarwarsHeroBaseSlider = withTheme(({ theme: { colors } }) => (
  <div css={{ display: 'flex', justifyContent: 'center' }}>
    <StarwarsSlider component={StarwarsHeroBase} />
  </div>
));
