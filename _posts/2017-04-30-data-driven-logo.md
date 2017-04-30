---
layout: post
title:  Our data-driven logo
date:   2017-04-22 13:00:00 +0100
tags:   tech
intro:  How we designed our logo to promote our data-driven values
excerpt: We feel data allows for better decision making, improves policies, and forces us to be impartial. When thinking about our logo we wanted to make sure it reflected our values around being data-driven in everything we do.
---

We feel data allows for better decision making, improves policies, and forces us to be impartial, and these are values that we wanted to carry through to our branding. When thinking about our logo we wanted to make sure it reflected these values.

As with many UK electoral trackers, we thought a good starting point was to include the colours of the main parties. To many who are interested in politics these are instantly recognisable and help to convey what we're trying to achieve.

![Election Tracker Logos]({% link images/post_images/logos.png %})

### Ideas

Now we're not designers, and pretty much had no idea what we were doing, so we started with a circle as that felt like a good starting point.

<p class="text-center">
    <!-- Equal distribution -->
    <sixfifty-logo
        data='{[{"name":"con","percentage":0.16666666667},{"name":"lab","percentage":0.16666666667},{"name":"ld","percentage":0.16666666667},{"name":"ukip","percentage":0.16666666667},{"name":"oth","percentage":0.16666666667},{"name":"grn","percentage":0.16666666667}]}'
        colours='{% raw %}{{% endraw %}{{ site.data.colours.parties | jsonify }}{% raw %}}{% endraw %}'
    ></sixfifty-logo>
</p>

However we really wanted to bring that data-driven aspect to it, so we wondered – what if the logo changed based on the current polling data?

We mocked up what it would look like for the current polls, and this was the result...

<p class="text-center">
    <!-- Polls 2017/04/20 -->
    <sixfifty-logo
        data='{[{"name":"con","percentage":0.45},{"name":"lab","percentage":0.26},{"name":"ld","percentage":0.11},{"name":"ukip","percentage":0.09},{"name":"oth","percentage":0.06},{"name":"grn","percentage":0.03}]}'
        colours='{% raw %}{{% endraw %}{{ site.data.colours.parties | jsonify }}{% raw %}}{% endraw %}'
    ></sixfifty-logo>
</p>

With the colours, it fits well with the other election trackers, and with the addition of the data and the fact that the logo will change over time, we feel this represents _us_.

### Implementation

To make this a reality we needed it to be easy to update, so we decided to create the logo with [React][react] and have it render in the browser based on dynamic data. Rendering in the browser isn't ideal for something that only changes on a daily basis, but as we don't have a server-side component to our stack at all it didn't feel worth adding one just to support this, plus React is pretty fast.

Once we had a simple component up and running, the next step was connecting it to the DOM so that we could easily include it anywhere on the site. To do this we used [Reactive Elements][reactive-elements], a library that makes it easy to convert React components to [Web Components][web-components].

```js
import 'reactive-elements';
import React from 'react';

class Logo extends React.Component {
  render() {
    return (
      <div className="logo">
        <svg>
            // ...
        </svg>
      </div>
    );
  }
}

document.registerReact('sixfifty-logo', Logo);
```

Using our component was now as easy as adding this HTML to any page.

```html
<sixfifty-logo
    data='{[
        {"name":"con","percentage":0.369},
        {"name":"lab","percentage":0.304},
        {"name":"ukip","percentage":0.126},
        {"name":"ld","percentage":0.079},
        {"name":"snp","percentage":0.047},
        {"name":"grn","percentage":0.038},
        {"name":"oth","percentage":0.037}
    ]}'
    colours='{% raw %}{{{% endraw %}
        "con":"#0F80D6",
        "lab":"#D20004",
        "ld":"#FEAA09",
        "grn":"#5EC500",
        "ukip":"#5E0D78",
        "snp":"#FFFF00",
        "oth":"#999999"
    {% raw %}}}{% endraw %}'
></sixfifty-logo>
```

The last thing we did was to centralise the data so that it can be update easily. We use [Jekyll][jekyll] to build the site so Jekyll's [data files][jekyll-datafiles] were a good fit, and now defining the values of the current polls, to be used for the logo and other visualisations throughout the site is as simple as editing a YAML file:

```yaml
current:
  - name: con
    percentage: 0.45
  - name: lab
    percentage: 0.26
  - name: ld
    percentage: 0.11
  - name: ukip
    percentage: 0.09
  - name: oth
    percentage: 0.06
  - name: grn
    percentage: 0.03
```

While this is a nice feature on our site, it's impractical to upload new logos to Twitter and other social-media platforms every day, so for those places that are hard to update we've decided to go with the 2015 election data.

<p class="text-center">
    <!-- 2015 results -->
    <sixfifty-logo
        data='{% raw %}{{% endraw %}{{ site.data.votes_2015.results | jsonify }}{% raw %}}{% endraw %}'
        colours='{% raw %}{{% endraw %}{{ site.data.colours.parties | jsonify }}{% raw %}}{% endraw %}'
    ></sixfifty-logo>
</p>

TODO: conclusion?


[sixfifty-source]: https://github.com/six50/sixfifty
[react]: https://facebook.github.io/react/
[reactive-elements]: https://github.com/PixelsCommander/ReactiveElements
[web-components]: https://en.wikipedia.org/wiki/Web_Components
[jekyll]: https://jekyllrb.com/
[jekyll-datafiles]: https://jekyllrb.com/docs/datafiles/
