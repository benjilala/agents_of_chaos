# Magic Markets — Product Doctrine

## What it is

**Magic Markets** is a prediction-market platform for real-world events.
Not sports-only — politics, entertainment, tech, culture, weather.
Users buy and sell shares in outcomes the way traders buy and sell
equities. The price *is* the probability.

Where Storm the Cup is a game of conviction,
Magic Markets is an **instrument of collective intelligence**.

## Core mechanic

```
Market opens → Shares trade between $0.01 – $0.99
  ↓
Price = crowd's implied probability
  ↓
Event resolves → Winning shares pay $1.00, losing shares pay $0
```

### Order book

The order book is the heartbeat. It shows:
- Bid/ask depth at each price level
- Spread (tightness = market confidence)
- Recent fills (velocity of conviction change)

Pro users live in the order book. It must be *fast, dense, and legible*
— Bloomberg-grade, not Robinhood-grade.

### Portfolio

Users hold positions across many markets simultaneously.
The portfolio view shows:
- Current P&L (mark-to-market)
- Position size per market
- Cost basis vs current price
- Unrealised / realised breakdown
- Exposure heatmap by category

## Design language

### Palette

Magic Markets shares the dark-first foundation with Storm but shifts
the accent vocabulary:

| Token                | Purpose                          |
|----------------------|----------------------------------|
| `magic-bid`          | Blue-green — buy/bid side        |
| `magic-ask`          | Rose-red — sell/ask side         |
| `magic-profit`       | Green — positive P&L             |
| `magic-loss`         | Red — negative P&L               |
| `magic-neutral`      | Silver/grey — settled, inactive  |
| `magic-accent`       | Violet — primary brand accent    |
| `magic-surface`      | Near-black — panel backgrounds   |

### Visual principles

- **Dense.** This is a trading interface. Respect whitespace but don't
  waste it. Every square centimetre communicates.
- **Monospaced numbers.** All prices, quantities, and P&L in `font-mono`.
  Columns must align vertically — a jittering price is a broken price.
- **Colour = direction.** Green up, red down, no exceptions.
  Use opacity to signal magnitude (stronger move = higher opacity).
- **Depth visualisation.** Bid/ask depth rendered as horizontal bars
  behind price levels, scaled to size. The shape of liquidity is
  immediately visible.
- **Subtle grid.** Faint borders creating implicit rows/columns.
  The interface should feel like a well-designed spreadsheet, not
  a web app.

### Trust signals

Trust is the product. Users are risking money on our probability engine.

- **Provenance.** Show market creator, resolution source, rules hash.
- **Resolution clarity.** Every market has an unambiguous resolution
  criteria visible from the market card.
- **Audit trail.** Every trade, every resolution, every price change
  has a timestamp and is queryable.
- **Latency display.** Show feed freshness ("prices as of 2s ago").
  Hiding latency erodes trust; showing it builds it.

### Typography

Same as Storm: Geist Sans / Geist Mono.
Monospaced for all numerical data. Proportional for labels and prose.

## Information architecture

```
/markets
  ├── (index)         → Trending markets, categories, search
  ├── /market/:slug   → Market detail (order book, chart, trades, resolution)
  ├── /portfolio      → Personal holdings, P&L, exposure
  ├── /history        → Trade history, filled orders
  ├── /leaderboard    → Top traders by ROI, accuracy, volume
  ├── /create         → Market creation (for approved creators)
  └── /u/:username    → Public trader profile
```

## Key views

### Market card (list view)
- Title, category badge, volume indicator
- Current price (last trade) with sparkline
- Time remaining or "Resolves: [date]"
- Bid/ask spread indicator

### Market detail
- Order book (left: bids, right: asks)
- Price chart (candlestick or area, time-selectable)
- Recent trades feed (time, price, size, direction)
- Resolution criteria panel
- Trade ticket (buy/sell, limit/market, quantity)
- Related markets

### Portfolio
- Summary row: total value, daily P&L, unrealised P&L
- Positions table: market, size, avg cost, current price, P&L
- Exposure breakdown: category pie/bar chart
- Performance chart: equity curve over time

## Emotional targets

| State            | The user should feel...                     |
|------------------|---------------------------------------------|
| Browsing markets | Intellectual curiosity, "I have an opinion" |
| Reading depth    | Clarity, understanding of crowd sentiment   |
| Placing a trade  | Precision, control, confidence              |
| Watching P&L     | Engaged, informed, not anxious              |
| Winning          | Vindication, "I was right"                  |
| Losing           | Acceptance, learning, "I see why"           |
| Viewing profile  | Pride in track record, credibility          |

## Relationship to Storm

Storm the Cup is a *vertical* — a specific prediction game built on
the same philosophical foundation. Magic Markets is the *platform*.
They share design DNA (dark-first, alive surfaces, oklch palette)
but differ in energy:

| Dimension     | Storm the Cup          | Magic Markets          |
|---------------|------------------------|------------------------|
| Energy        | Electric, chaotic      | Precise, institutional |
| Metaphor      | Broadcast control room | Trading floor          |
| Density       | Medium-high            | Very high              |
| Motion        | Expressive             | Functional             |
| Audience      | Fans, gamblers         | Traders, analysts      |
| Primary verb  | Pick, ride, vault      | Buy, sell, hold        |
