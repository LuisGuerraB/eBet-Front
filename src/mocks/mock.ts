import {Bet} from "../model/bet";
import {PlayMatch} from "../model/play";
import {Match} from "../model/match";
import {Tournament} from "../model/tournament";
import {League} from "../model/league";
import {User} from "../model/user";

export const userMock: User = new User(
  'username',
  1000,
  false,
  'name',
  new Date(),
  ['m', 'a'],
)

export const leagueMock: League = new League(
  1,
  'name',
  'acr',
  'img'
)

export const tournamentMock: Tournament = new Tournament(
  1,
  'name',
  leagueMock,
  new Date(),
  new Date()
)

export const matchMock: Match = new Match(
  1,
  1,
  tournamentMock,
  new Date(),
  new Date(),
  'plandate',
  new Map<string, number>()
)

export const playMatchMock: PlayMatch = new PlayMatch(
  matchMock,
  1
)

export const betMock: Bet = new Bet(
  new Date(),
  'type',
  1,
  100,
  playMatchMock,
  1,
  1,
  true
);
