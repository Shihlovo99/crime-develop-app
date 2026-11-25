# Provider filters

## Build
- Add filters to the Services provider list for nearby service area (distance in km), availability, and minimum customer rating.
- Apply filters together with the selected service category and show a clear empty state plus a reset option.
- Keep filter logic reusable and cover the distance, availability, and rating rules with focused tests.

## Technical details
- Use the existing provider distance, availability, and rating fields; service-area choices represent a maximum distance from the customer.
- Keep the controls in the existing Services screen and reuse the app's Select, Button, and semantic color tokens.
