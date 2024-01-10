function skillsMember(){
    return{
        restrict: 'E',
        templateUrl: 'modules/skills/view/member.html',
        controller: 'SkillsMemberController',
        bindToController: true,
        scope: {
            member: '='
        }
    }
}