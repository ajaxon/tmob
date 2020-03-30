# T-Mobile Coding Challenge

### Important! Read this First !

Do **not** submit a pull request to this repository.  You PR wil be rejected and your submission ignored.
To be safe **do not Fork** this repository, if you do you will be tempted to create a PR.

To _properly_ submit a coding challenge you must:

1. Create a blank (empty) repo in the public git service of your choice ( github, gitlab, bitbucket )
2. Clone this repo to your local workstation
3. Reset the remote origin to point to your newly created empty repo
4. Push the master branch up to your repo

5. make necessary changes
6. push changes to your origin
7. send address of your copy to t-mobile.

We will review your copy online before and during your interview.


# Stocks coding challenge

## How to run the application

There are two apps: `stocks` and `stocks-api`.

- `stocks` is the front-end. It uses Angular 7 and Material. You can run this using `yarn serve:stocks`
- `stocks-api` uses Hapi and has a very minimal implementation. You can start the API server with `yarn serve:stocks-api`

A proxy has been set up in `stocks` to proxy calls to `locahost:3333` which is the port that the Hapi server listens on.

> You need to register for a token here: https://iexcloud.io/cloud-login#/register/ Use this token in the `environment.ts` file for the `stocks` app.

> The charting library is the Google charts API: https://developers.google.com/chart/

## Problem statement

[Original problem statement](https://github.com/tmobile/developer-kata/blob/master/puzzles/web-api/stock-broker.md)

### Task 1

Please provide a short code review of the base `master` branch:

#### Task 1-A
1. What is done well?

    App is focusing on the UI and with no HttpClient or state management framework referenced inside. Decoupling from data access layer makes switching out  state management easier. I have not been doing this myself and was unaware until reading about the monorepo blueprint.
    Naming conventions done well.
    Good use of ngrx
    
    
  
2. What would you change?

    Would add strict: true for compiler options on tsconfig file.
    Would break out the routing from the app.module.ts. I prefer to have separate routing module
    Make the chart configurable from ui - type of chart, options to display , etc
    Selector is choosing which data is provided to our chart - needs to configurable from ui based on data returned by api so chart is more interactive
    Add styling and responsiveness -- maybe make chart more responsive - need padding and margins
    Add "angularCompilerOptions": {
      "fullTemplateTypeCheck": true,
    } inside tsconfig

    Add /coverage to .gitignore
        

3. Are there any code smells or problematic implementations?

  Tests are failing.

  Chart Component:

        1.In Chart Component observable is being subscribed but never unsubscribed ->     this.data$.subscribe(newData => (this.chartData = newData));
        Either use async pipe or manually set reference to subscription so we can unsubscribe in onDestroy else it is a memory leak.
        Also don't see the purpose of subscribing just to set to component state property "charData" just to trigger rerender -- remove chartData and change detection strategy to OnPush.
        Might be best to not have component receive observable as input but use async in parent when passing in.
        2. chart should not be set inside the component - move it out and let it be a component property so component is more reusable
        3. ChangeDetectorRef is not being used
        4. Change   @Input() data$: Observable<any>; to use typed object and not use any - never use any 
        5. In html chart is only being rendered if data exists but is an observable being subcribed to in component - move to async pipe 

    Stocks Component:

        1. Add error handling on form input for frontend and if errors from api - missing time error display
        2. pass data as async pipe to child


> Make a PR to fix at least one of the issues that you identify

#### Task 1-B

[Accessability](https://www.w3.org/WAI/GL/WCAG20/) is an important feature of all public facing websites.  

> Make a PR to add accessability features to the web application


### Task 2

```
Business requirement: As a user I should be able to type into
the symbol field and make a valid time-frame selection so that
the graph is refreshed automatically without needing to click a button.
```

_**Make a PR from the branch `feat_stock_typeahead` to `master` and provide a code review on this PR**_

> Add comments to the PR. Focus on all items that you can see - this is a hypothetical example but let's treat it as a critical application. Then present these changes as another commit on the PR.

### Task 3

```
Business requirement: As a user I want to choose custom dates
so that I can view the trends within a specific period of time.
```

_**Implement this feature and make a PR from the branch `feat_custom_dates` to `master`.**_

> Use the material date-picker component

> We need two date-pickers: "from" and "to". The date-pickers should not allow selection of dates after the current day. "to" cannot be before "from" (selecting an invalid range should make both dates the same value)

### Task 4

```
Technical requirement: the server `stocks-api` should be used as a proxy
to make calls. Calls should be cached in memory to avoid querying for the
same data. If a query is not in cache we should call-through to the API.
```

_**Implement the solution and make a PR from the branch `feat_proxy_server` to `master`**_

> It is important to get the implementation working before trying to organize and clean it up.
