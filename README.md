# Ash's Pokémon Card Collection

## Setup instructions

You need to have `npm` and `node` installed on your machine (I used `npm` v10 / `node` v20).

From your terminal, access the repository folder and run the following command to install all the project dependencies:

```bash
npm i
```

Then run the following command to start the project:

```bash
npm run preview
```

The app should be up and running at `http://localhost:4173`.

## Decisions made

### Project template

I decided to keep things simple and used a Vite + TS + React + Tailwind template to kick-start my project. By using Tailwind I could start making things beautiful from the get go without the need to worry about defining a theme, design tokens, etc. Another reason for me to use Tailwind was so that I could use `shadcn/ui`'s component library. I really wanted to make the app look pretty but I didn't want to waste too much time creating pretty components myself, so I just took a couple that I knew I was gonna need from `shadcn/ui` and adapted them slightly.

### Grid implementation

I spent quite a lot of time designing and implementing the grid view. I started with the Pokémon grid and, once it was feature-complete, I reused the implementation for the Energy and Trainer grids by extracting most of the logic into reusable components and hooks.

### Data visualization library

I was excited to try a new data visualization library; previously I had only used [`shadcn/ui`'s charts](https://ui.shadcn.com/charts) previously (which are built using [Recharts](https://recharts.org/en-US/)). After checking both Echarts and VictoryChart for a bit, I decided to go for the first as there were a lot more examples in their website, and their charts look gorgeous!

The first search result for "echarts react" brought up `echarts-for-react`, an `npm` package which provides a quite simple React wrapper for Echarts, but I decided not to use it because it was seemingly abadoned and the documentation was very poor (and mostly in Chinese).

Since all I needed was a React component that I could pass the Echarts configuration to, I searched a bit more and found [this very helpful article](https://dev.to/manufac/using-apache-echarts-with-react-and-typescript-353k) that I copied my `EChart` component from.

### Chart implementation

Implementing the charts wasn't as complex as I thought it would be thanks to the plethora of examples available at [Apache Echarts' website](https://echarts.apache.org/examples/en/index.html). The one thing I struggled the most with was actually naming the charts, as I knew which information I wanted to cross and visualize but I found it hard to express the concept with just a few words.

The implemented charts are the following:
- **Card type distribution**: Type actually refers to "supertype"; this chart shows how many Pokémon cards Vs energy cards Vs trainer cards are there in the collection.
- **Card rarity**: A distribution of all the cards (including Pokémon, energies, and trainers) by their rarity; there's a second chart which further breaks down the type of "Rare" cards.
- **Pokémon type Vs average HP**: This chart was the most fun to implement. I was curious to know which were the Pokémons with the highest HP in relationship to their type. I used the scatter chart so that I could also show the total number of Pokémons per type (however, it later dawned on me that the data may be somewhat biased because there are repeated Pokémons in the card collection).
- **Pokémon sets by type**: After noticing there seemed to be many repeated Pokémons in the collection, I then realized they were actually different cards (e.g. there are 13 different Pikachu cards). I assumed these belonged to different "card sets" and I wondered which Pokémons would have the more sets, and I decided to throw in the Pokémon type too for added flavor. In hindsight I have to admit that a sunburst chart maybe wasn't the best data visualization for it.

## Unimplemented features

### A summary section that shows off some key stats
After implementing the grids first, I scratched my brain thinking about cool data visualizations that I could include. All of a sudden I had a couple good ideas and I was eager to try Apache ECharts for the first time so I ended up implementing 4 different data visualizations and didn't have time nor ideas left for what to include in the summary, so I decided not to add it at all.

### Improve performance by adding pagination or windowing to the grids
At first I didn't realize there were soooo many entries in the JSON file, so I didn't think of implementing any pagination nor virtualization / windowing (using a package like [`react-window`](https://github.com/bvaughn/react-window)) from the get go. It soon became obvious that loading 1000+ entries and images at once was a bit overkill, so I told myself I'd add it at the end if I had any time left, but I didn't!

### Adding route sections as subroutes

I added React router as a client-side router after I had already implemented the Dashboard page with its 3 sections (Pokémons, Energies, and Trainers), then I followed the same "section approach" for the different charts under the Charts page. I then realized it would make sense for the sections to be accessible directly through the URL by using either nested routes or query params. Again, I decided it wasn't as high priority and ultimately didn't have time to add it.