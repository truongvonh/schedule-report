export interface IssuesResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
}

export interface Issue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: IssueFields;
}

export interface IssueFields {
  statuscategorychangedate: string;
  issuetype: Issuetype;
  parent?: Parent;
  timespent: null;
  customfield_10030: null | string;
  project: Project;
  fixVersions: any[];
  aggregatetimespent: null;
  resolution: null;
  customfield_10029: any[];
  resolutiondate: null;
  workratio: number;
  lastViewed: null | string;
  watches: Watches;
  created: string;
  customfield_10020: Customfield10020[];
  customfield_10021: null;
  customfield_10022: null;
  priority: Priority;
  customfield_10023: null;
  customfield_10024: null | string;
  customfield_10025: null;
  labels: string[];
  customfield_10016: null;
  customfield_10017: null;
  customfield_10018: Customfield10018;
  customfield_10019: string;
  aggregatetimeoriginalestimate: null;
  timeestimate: null;
  versions: any[];
  issuelinks: any[];
  assignee: Assignee;
  updated: string;
  status: Status;
  components: any[];
  timeoriginalestimate: null;
  description: DescriptionClass;
  customfield_10010: null;
  customfield_10014: null;
  customfield_10015: null;
  customfield_10005: null;
  customfield_10006: null;
  customfield_10007: null;
  security: null;
  customfield_10008: null;
  customfield_10009: null;
  aggregatetimeestimate: null;
  summary: string;
  creator: Assignee;
  subtasks: any[];
  reporter: Assignee;
  aggregateprogress: Progress;
  customfield_10000: string;
  customfield_10001: null;
  customfield_10002: null;
  customfield_10003: null;
  customfield_10004: null;
  environment: null;
  duedate: null;
  progress: Progress;
  votes: Votes;
}

export interface Progress {
  progress: number;
  total: number;
}

export interface Assignee {
  self: string;
  accountId: AccountID;
  emailAddress?: string;
  avatarUrls: AvatarUrls;
  displayName: DisplayName;
  active: boolean;
  timeZone: TimeZone;
  accountType: AccountType;
}

export enum AccountID {
  The5Bcb20F8B3E37A158C364708 = "5bcb20f8b3e37a158c364708",
  The61498284A6F69E006D4329F2 = "61498284a6f69e006d4329f2",
  The615A79237A6Be40071E1E5Be = "615a79237a6be40071e1e5be",
}

export enum AccountType {
  Atlassian = "atlassian",
}

export interface AvatarUrls {
  "48x48": string;
  "24x24": string;
  "16x16": string;
  "32x32": string;
}

export enum DisplayName {
  TrangHuynhJane = "trang huynh (Jane)",
  TrườngVõNhật = "Trường Võ Nhật",
  TừThịXuânHồng = "Từ Thị Xuân Hồng",
}

export enum TimeZone {
  AsiaSeoul = "Asia/Seoul",
}

export interface Customfield10018 {
  hasEpicLinkFieldDependency: boolean;
  showField: boolean;
  nonEditableReason: NonEditableReason;
}

export interface NonEditableReason {
  reason: string;
  message: string;
}

export interface Customfield10020 {
  id: number;
  name: string;
  state: string;
  boardId: number;
  goal: string;
  startDate: Date;
  endDate: Date;
}

export interface DescriptionClass {
  version: number;
  type: string;
  content: DescriptionContent[];
}

export interface DescriptionContent {
  type: FluffyType;
  attrs?: PurpleAttrs;
  content: PurpleContent[];
}

export interface PurpleAttrs {
  level?: number;
  layout?: string;
}

export interface PurpleContent {
  type: PurpleType;
  text?: string;
  content?: FluffyContent[];
  attrs?: FluffyAttrs;
  marks?: Mark[];
}

export interface FluffyAttrs {
  id?: string;
  type?: string;
  collection?: string;
  width?: number;
  height?: number;
  url?: string;
}

export interface FluffyContent {
  type: FluffyType;
  content: TentacledContent[];
}

export interface TentacledContent {
  type: PurpleType;
  text: string;
}

export enum PurpleType {
  HardBreak = "hardBreak",
  InlineCard = "inlineCard",
  ListItem = "listItem",
  Media = "media",
  Text = "text",
}

export enum FluffyType {
  BulletList = "bulletList",
  Heading = "heading",
  MediaSingle = "mediaSingle",
  OrderedList = "orderedList",
  Paragraph = "paragraph",
}

export interface Mark {
  type: string;
  attrs?: MarkAttrs;
}

export interface MarkAttrs {
  color: string;
}

export interface Issuetype {
  self: string;
  id: string;
  description: DescriptionEnum;
  iconUrl: string;
  name: IssuetypeName;
  subtask: boolean;
  avatarId: number;
  entityId: string;
  hierarchyLevel: number;
}

export enum DescriptionEnum {
  Empty = "",
  EpicsTrackCollectionsOfRelatedBugsStoriesAndTasks = "Epics track collections of related bugs, stories, and tasks.",
  TasksTrackSmallDistinctPiecesOfWork = "Tasks track small, distinct pieces of work.",
}

export enum IssuetypeName {
  Epic = "Epic",
  SpecsChange = "SpecsChange",
  Task = "Task",
}

export interface Parent {
  id: string;
  key: string;
  self: string;
  fields: ParentFields;
}

export interface ParentFields {
  summary: string;
  status: Status;
  priority: Priority;
  issuetype: Issuetype;
}

export interface Priority {
  self: string;
  iconUrl: string;
  name: PriorityName;
  id: string;
}

export enum PriorityName {
  High = "High",
  Medium = "Medium",
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: StatusName;
  id: string;
  statusCategory: StatusCategory;
}

export enum StatusName {
  DevTesting = "DEV TESTING",
  InProgress = "In Progress",
  ToDo = "To Do",
  Review = "REVIEW",
}

export interface StatusCategory {
  self: string;
  id: number;
  key: Key;
  colorName: ColorName;
  name: StatusName;
}

export enum ColorName {
  BlueGray = "blue-gray",
  Yellow = "yellow",
}

export enum Key {
  Indeterminate = "indeterminate",
  New = "new",
}

export interface Project {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: AvatarUrls;
}

export interface Votes {
  self: string;
  votes: number;
  hasVoted: boolean;
}

export interface Watches {
  self: string;
  watchCount: number;
  isWatching: boolean;
}
