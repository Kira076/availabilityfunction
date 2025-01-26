const { main } = require("../hello");

describe("Test App", () => {
  test("Hello", () => {
    let response = main({ events: [
        { start: '2025-01-25T09:00', end: '2025-01-25T10:00' },
        { start: '2025-01-25T12:00', end: '2025-01-25T13:00' },
        { start: '2025-01-26T09:00', end: '2025-01-26T10:00' },
        { start: '2025-01-26T14:00', end: '2025-01-26T15:00' },
        { start: '2025-01-27T11:00', end: '2025-01-27T12:00' }
      ] });
    expect(response.body).toEqual(`Availability for 2025-01-25:
  Available: 00:00 - 09:00
  Available: 10:00 - 12:00
  Available: 13:00 - 23:59
Availability for 2025-01-26:
  Available: 00:00 - 09:00
  Available: 10:00 - 14:00
  Available: 15:00 - 23:59
Availability for 2025-01-27:
  Available: 00:00 - 11:00
  Available: 12:00 - 23:59`);
  });
});
