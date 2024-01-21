const employees = [
  { name: "Leanne Graham", position: "worker", email: "leanne@graham.com" },
  { name: "Ervin Howell", position: "worker", email: "ervin@howellj.com" },
  {
    name: "Clementine Bauch",
    position: "worker",
    email: "clementine@bauch.com",
  },
  {
    name: "Patricia Lebsack",
    position: "supervisor",
    email: "patricia@lebsack.com",
  },
  { name: "Chad Kertzmann", position: "manager", email: "chad@kertzmann.com" },
  { name: "Nora Roberts", position: "worker", email: "nora@roberts.com" },
  { name: "Julian Cassin", position: "worker", email: "julian@cassin.com" },
  { name: "Elsie Lynch", position: "supervisor", email: "elsie@lynch.com" },
  { name: "Kurtis Weissnat", position: "worker", email: "kurtis@weissnat.com" },
  {
    name: "Nicholas Runolfsdottir",
    position: "worker",
    email: "nicholas@runolfsdottir.com",
  },
  {
    name: "Glenna Reichert",
    position: "supervisor",
    email: "glenna@reichert.com",
  },
  {
    name: "Clementina DuBuque",
    position: "worker",
    email: "clementina@dubuque.com",
  },
  { name: "Aidan Tromp", position: "manager", email: "aidan@tromp.com" },
  { name: "Yasmeen Goodwin", position: "worker", email: "yasmeen@goodwin.com" },
  { name: "Malik Herzog", position: "worker", email: "malik@herzog.com" },
  { name: "Beverly Hills", position: "supervisor", email: "beverly@hills.com" },
  { name: "Uriel Feeney", position: "worker", email: "uriel@feeney.com" },
  { name: "Dora Medhurst", position: "worker", email: "dora@medhurst.com" },
  { name: "Amos Bahringer", position: "worker", email: "amos@bahringer.com" },
  { name: "Rita Turcotte", position: "supervisor", email: "rita@turcotte.com" },
];

const shifts = [
  {
    start: "2023-12-15T08:00:00",
    end: "2023-12-15T16:00:00",
    title: "Shift 1A",
  },
  {
    start: "2023-12-15T12:00:00",
    end: "2023-12-15T20:00:00",
    title: "Shift 1B",
  },
  {
    start: "2023-12-16T10:00:00",
    end: "2023-12-16T18:00:00",
    title: "Shift 2",
  },
  {
    start: "2023-12-17T07:00:00",
    end: "2023-12-17T15:00:00",
    title: "Shift 3A",
  },
  {
    start: "2023-12-17T14:00:00",
    end: "2023-12-17T22:00:00",
    title: "Shift 3B",
  },
  {
    start: "2023-12-18T11:00:00",
    end: "2023-12-18T19:00:00",
    title: "Shift 4",
  },
  {
    start: "2023-12-19T09:30:00",
    end: "2023-12-19T17:30:00",
    title: "Shift 5A",
  },
  {
    start: "2023-12-19T16:00:00",
    end: "2023-12-20T00:00:00",
    title: "Shift 5B",
  },
  {
    start: "2023-12-20T12:00:00",
    end: "2023-12-20T20:00:00",
    title: "Shift 6",
  },
  {
    start: "2023-12-21T06:00:00",
    end: "2023-12-21T14:00:00",
    title: "Shift 7A",
  },
  {
    start: "2023-12-21T13:00:00",
    end: "2023-12-21T21:00:00",
    title: "Shift 7B",
  },
  {
    start: "2023-12-22T13:00:00",
    end: "2023-12-22T21:00:00",
    title: "Shift 8",
  },
  // Additional shifts if needed on the weekend
  {
    start: "2023-12-23T08:30:00",
    end: "2023-12-23T16:30:00",
    title: "Shift 9",
  },
  {
    start: "2023-12-24T14:00:00",
    end: "2023-12-24T22:00:00",
    title: "Shift 10",
  },
];

module.exports = { employees, shifts };
