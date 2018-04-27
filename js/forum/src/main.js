import app from 'flarum/app';
import { extend, override } from 'flarum/extend';

import DiscussionComposer from 'flarum/components/DiscussionComposer';

import Model from 'flarum/Model';
import Question from 'reflar/polls/models/Question';
import Answer from 'reflar/polls/models/Answer';
import Vote from 'reflar/polls/models/Vote';
import Discussion from 'flarum/models/Discussion';
import Post from 'flarum/models/Post';

import PollControl from 'reflar/polls/PollControl';
import PollDiscussion from 'reflar/polls/PollDiscussion';
import PollModal from 'reflar/polls/components/PollModal';

app.initializers.add('reflar-polls', app => {
  // Relationships
  app.store.models.answers = Answer;
  app.store.models.questions = Question;
  app.store.models.votes = Vote;

  Discussion.prototype.Poll = Model.hasOne('Poll');
  Post.prototype.canEditPoll = Model.attribute('canEditPoll');

  const pollModal = new PollModal();

  DiscussionComposer.prototype.addPoll = function() {
    app.modal.show(pollModal);
  };

  // Add button to DiscussionComposer header
  extend(DiscussionComposer.prototype, 'headerItems', function(items) {
    items.add('polls', (<a className="DiscussionComposer-poll" onclick={this.addPoll}><span className="TagLabel">{app.translator.trans('reflar-polls.forum.composer_discussion.add_poll')}</span></a>), 1);
  });

  PollDiscussion();
  PollControl();
});
