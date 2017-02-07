<ion-view>
<input type="textarea" ng-model=message.data>
<button ng-click=post()>Post</button>

<div ng-repeat="messi in mess">
<h3>{{messi.user}}</h3>
<h4>{{messi.data}}</h4>
</div>
</ion-view>