import { Model } from 'objection'
import Clip from './Clip';
import Comment from './Comment';

// TODO: Secure authentication

export default class Account extends Model {
  id!: number;
  external_id!: string;
  moderator?: boolean;
  username?: string;
  
  static tableName = 'account';
  
  static jsonSchema = {
    type: 'object',
    required: ['external_id'],
    properties: {
      id: { type: 'integer' },
      username: { type: 'string', minLength: 3, maxLength: 20 },
      email: { type: 'string', minLength: 3, maxLength: 255 },
    },
  }

  static relationMappings = () => ({
    // Clips an account has created
    clipsCreated: {
      relation: Model.HasManyRelation,
      modelClass: Clip,
      join: {
        from: 'account.id',
        to: 'clip.account_id',
      },
    },
    // Clips an account has liked
    clipsLiked: {
      relation: Model.ManyToManyRelation,
      modelClass: Clip,
      join: {
        from: 'account.id',
        through: {
          from: 'account_clip_likes.account_id',
          to: 'account_clip_likes.clip_id',
        },
        to: 'clip.id',
      },
    },
    // Clips this account has commented on
    clipsCommentedOn: {
      relation: Model.ManyToManyRelation,
      modelClass: Clip,
      join: {
        from: 'account.id',
        through: {
          from: 'comment.account_id',
          to: 'comment.clip_id',
        },
        to: 'clip.id',
      },
    },
    // Comments on clips by this account
    commentsMade: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: 'account.id',
        to: 'comment.account_id',
      },
    },
  });

}