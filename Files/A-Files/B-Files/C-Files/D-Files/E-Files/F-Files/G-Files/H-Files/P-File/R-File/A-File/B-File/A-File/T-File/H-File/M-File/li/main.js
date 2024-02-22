const axios = require('axios');
const cheerio = require('cheerio');

async function moviesForYou() {
  try {
    const url = 'https://sinhalasub.life/';
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const moviesForYou = [];
      $('#genre_action .item.movies').each((index, element) => {
        const title = $(element).find('.data h3 a').text().replace('Sinhala Subtitles | සිංහල උපසිරසි සමඟ','').trim();
        const date = $(element).find('.data span').text().trim();
        const rating = $(element).find('.rating').text().trim();
        const quality = $(element).find('.mepo .quality').text().trim();
        const image = $(element).find('.poster img').attr('src');
        const link = $(element).find('.poster a').attr('href');

        moviesForYou.push([{ title, date, rating, quality, image, link }]);
      });
      const seeAllLink = $('header h2:contains("Movies For You")').siblings('span').find('a.see-all').attr('href');
      moviesForYou.push({seeAllLink});

      return moviesForYou;
    } else {
      console.error('Failed to fetch the page');
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function slider(){
  try {
    const url = 'https://sinhalasub.life/';
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const slider = [];

      $('#slider-movies-tvshows .item').each((index, element) => {
        const title = $(element).find('.title').text().replace('Sinhala Subtitles | සිංහල උපසිරසි සමඟ','').trim();
        const year = $(element).find('.data span').text().trim();
        const type = $(element).find('.item_type').text().trim();
        const image = $(element).find('img').attr('src');
        const link = $(element).find('a').attr('href');

        slider.push({ title, year, type, image, link });
      });

    return slider;
} else {
    console.error('Failed to fetch the page');
    return [];
  }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function NewAdded() {
  try {
    const url = 'https://sinhalasub.life/';
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const NewAdded = [];



$('#dt-movies .item.movies').each((index, element) => {
    const title = $(element).find('.data h3 a').text().replace('Sinhala Subtitles | සිංහල උපසිරසි සමඟ','').trim();
    const date = $(element).find('.data span').text().trim();
    const rating = $(element).find('.rating').text().trim();
    const quality = $(element).find('.mepo .quality').text().trim();
    const image = $(element).find('.poster img').attr('src');
    const link = $(element).find('.poster a').attr('href');

    NewAdded.push([{ title, date, rating, quality, image, link }]);
});

const seeAllNewAddedLink = $('header h2:contains("New Added Movies")').next('span').find('a.see-all').attr('href');
NewAdded.push({seeAllNewAddedLink});
    return NewAdded;
} else {
    console.error('Failed to fetch the page');
    return [];
  }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function episodes() {
  try {
    const url = 'https://sinhalasub.life/';
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const episodes = [];
      $('#dt-episodes .item.se.episodes').each((index, element) => {
        const title = $(element).find('.data h3 a').text().replace('Sinhala Subtitles | සිංහල උපසිරසි සමඟ','').trim();
        const serieName = $(element).find('.data .serie').text().trim();
        const episodeText = $(element).find('.data span').text().trim();
        const episode = episodeText.split('/')[0].trim().replace(`${serieName}:`, '').trim();
        const date = episodeText.split('/')[1].trim();
        const quality = $(element).find('.poster .quality').text().trim();
        const image = $(element).find('.poster img').attr('src');
        const link = $(element).find('.poster a').attr('href');

        episodes.push({ title, serieName, episode, date, quality, image, link });
      });

      const seeAllNewEpisodesLink = $('header h2:contains("Episodes")').siblings('span').find('a.see-all').attr('href');
      episodes.push({ seeAllNewEpisodesLink });

      return episodes;
    } else {
      console.error('Failed to fetch the page');
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function tvShows() {
  try {
    const url = 'https://sinhalasub.life/tvshows/';
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const tvShows = [];
      $('#dt-tvshows .item.tvshows').each((index, element) => {
        const title = $(element).find('.data h3 a').text().replace('Sinhala Subtitles | සිංහල උපසිරසි සමඟ','').trim();
        const rating = parseFloat($(element).find('.poster .rating').text().trim());
        const status = $(element).find('.poster .mepo .ongoingtv').text().trim() || $(element).find('.poster .mepo .completetv').text().trim();
        const seasonEpisode = $(element).find('.poster .mepo .completetv').text().trim();
        const image = $(element).find('.poster img').attr('src');
        const link = $(element).find('.poster a').attr('href');
        const date = $(element).find('.data span').text().trim();

        tvShows.push({ title, rating, status, seasonEpisode, image, link, date });
      });

      const seeAllTvShowsLink = $('header h2:contains("TV Shows")').siblings('span').find('a.see-all').attr('href');
      tvShows.push({ seeAllTvShowsLink });

      return tvShows;
    } else {
      console.error('Failed to fetch the page');
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}


module.exports = {
  moviesForYou,
  slider,
  NewAdded,
  episodes,
  tvShows
};
