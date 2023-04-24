## Block chain explorer

- Stack: React JS, Typescript
- Dependencies: Axios, React router dom, Moment
- API: PolyScan & EtherScan

To install the project, make sure to get PolyScan & EtherScan API Keys, go to project, find `.env.example` change to `.env` and add API keys.

Block Chain Explorer allows the user to view the balance of the address as well as input either an Ethereum or Polygon address and see history transactions, gas prices, and values of the transactions.

The web app is also fully web and mobile responsive.

---
#### What needs to be done:
- I would also add random generated hashes at the beginning of page load and allow the user to input their own if needed.
- I could also ask the user if they want to connect meta mask and their transactions will show on the web app in addition to the generated hashes or just their own transactions.
- I would clean up the code and make it more dynamic since both have the same functions.
This would likely be less code and more efficient.
- I would put more time in the design, create a figma file, make sure how everything looks good and making the app look more inviting.
- Create a landing page, about, contact us, turn it into a product.
- Add SEO.
- I would also read more into the API's documentation and understand how things work better.

#### Assumptions:
- Used the Ether/Poly Scan API's rather than creating dummy data. Using real world addresses and retrieving real world transactions.
- Instead of generating random hashes at page load, the app requests the user to add their own ETH or POLY address.
- Added a Navbar to switch between Poly and Ether.

---

#### DEMO:

https://user-images.githubusercontent.com/35424606/233890178-1ffc55a9-6fd8-43aa-80f7-1aaa8792c41b.mov








