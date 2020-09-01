# Full Stack Engineer Take-Home Project

The goal of this exercise is to test your front-end chops and validate your ability to write a React component that interacts with a miniature version of our real-world API, and renders a visualization that is used by our application today. A later review of this project will expand on the work you've done and test your ability in designing the API and the data store itself.

This repository contains a barebones application that was scaffolded by Create React App.

To start the project, run the following (**Note that you will need Node and NPM installed for this to work**):

```sh
# Install app dependencies
npm install
# Run the app on port 3000
npm start
```

To verify that everything worked, you should see a page with the words "Hello from Graphika!" on it.

The goal of this application is to display chronotope information for a map in a single page: a chronotope is a scatter-plot-like visualization that displays the usages of a specific hashtag over time by nodes within specific clusters or groups of a map. You are given artistic freedom in whatever styling or markup you use as long as it's sensible given consideration the scale and format of the data.

## API

There are four API endpoints mocked up for you, which roughly corresponds to the information architecture and hierarchy within the Graphika platform:

- `fetchMap()` returns the metadata for a single map. A chronotope page is always within the context of a single map. A map contains groups, which in turn contain clusters.
- `fetchGroups()` returns the metadata for all of the groups of clusters for a map. Groups are ordered by their `position` property and are unique identified within a map via their `group_no` property.
- `fetchClusters()` returns the metadata for all of the clusters for a map. Each cluster is a collection of Twitter users. The cluster object has a pointer `group_no` that that tells you which group it's in (it matches to a group's corresponding `group_no` property). Clusters are ordered by their `position` property and are uniquely identified within a map via their `cluster_no` property.
- `fetchChronotopeData()` returns an array of occurrences for the hashtag `#craftbeer` in this map. Each one will have a `hit_time` that tells you when (in UTC) the hashtag was used, and the `cluster_no` which tells you in which cluster the user of this hashtag belongs in (it matches to a cluster's corresponding `cluster_no` property).

## Requirements

The business requirements for this exercise is to have the React application render the chronotope visualization with the following must-haves:

- There should be a title on the page that contains the map's name
- There should be a visualization with two axes:
  - The x-axis is time, starting from the earliest occurrence in the chronotope data, and ending with the latest occurrence in the chronotope data
  - The y-axis has a categorical entry for each cluster, depending on the grouping mode.
  - The y-axis values should be ordinally sorted by the following criterion: by the group's `position` ascending, then by the cluster's `position` ascending. Example: if two values corresponding to clusters A and B have positions 12 and 3, but A's group has position 2 and B's group has position 4, then A should come before B. If A and B belongs in the same group, then A should come after B.
- You do not need to render the axes or their labels, but the visualization must render a data point corresponding to the appropriate X and Y coordinate based on when an occurrence happened (x-value) and in which cluster the occurrence happened (y-value). One data point should be rendered per occurrence.
- Each data point rendered on the page should have the same color as the cluster that it belongs to. The color of a cluster is dictated by its `hex_color` property (which is a hex value).
- When clicking on a data point, there should be an informational block appearing somewhere on the page (it can be a tooltip, or it can just be rendered beneath the visualization) that lists the details of the occurrence:
  - When the occurrence happened
  - The name of the cluster in which it happened, this text should be colored by the cluster's `hex_color`.
  - The name of the group in which it happened, this text should be colored by the group's `hex_color`.
- You are free to write tests for this project but they are _not_ necessary.

An example of how the visualization should be rendered can be seen in the `chronotope_example.png` file that came with this document. Some notes about the example that is not a requirement in this exercise:

- The example does render the axes and its labels (which is not necessary). The y-axis labels are actually the groups that each cluster belongs to, but each horizontal "slice" of the visualization is for a single cluster.
- The example renders each data point with transparency to highlight multiple occurrencces at the same time by different users.
- The example does not include the informational "tooltip" when clicking on a data point.

A simpler example that contains only everything you need to do for the exercise can be found in `chronotope_example2.png`.

## Restrictions

- You should only spend a max of 2 hours working on this.
- You may not modify any code within `src/api`.

## Internal Notes

- A sample correct answer can be found within the `answer_key` directory, which contains the necessary code that can be replaced into the `src` directory to run the app with all the necessary requirements.
