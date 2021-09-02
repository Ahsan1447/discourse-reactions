import DiscourseRoute from "discourse/routes/discourse";
import CustomReaction from "../models/discourse-reactions-custom-reaction";

export default DiscourseRoute.extend({
  model() {
    return CustomReaction.findReactions(
      "my-reactions",
      this.modelFor("user").get("username")
    );
  },

  setupController(controller, model) {
    let loadedAll = model.length < 20;
    this.controllerFor("user-activity-my-reactions").setProperties({
      model,
      canLoadMore: !loadedAll,
      reactionsUrl: "my-reactions",
      username: this.modelFor("user").get("username"),
    });
    this.controllerFor("application").set("showFooter", loadedAll);
  },

  renderTemplate() {
    this.render("user-activity-my-reactions");
  },
});
