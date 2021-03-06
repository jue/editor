import BaseProperty from "./BaseProperty";
import { LOAD, DEBOUNCE } from "@core/Event";
import { EVENT } from "@core/UIElement";

export default class BackgroundClipProperty extends BaseProperty {
  
  getTitle() {
    return "Background Clip";
  }

  isFirstShow() {
    return false; 
  }

  getTools() {
    return /*html*/`<div ref='$backgroundClip' style='padding-top: 3px;'></div>`;
  }  

  [LOAD("$backgroundClip")]() {
    var current = this.$selection.current || {};

    var clip = current['background-clip'] || ''
    return /*html*/`<SelectEditor ref='$1' key='background-clip' icon="true" value="${clip}" options=",paddinb-box,border-box,content-box,text" onchange="changeSelect" />`;
  }

  [EVENT('changeSelect')] (key, value) {
      this.command('setAttribute', "change background clip", {
        [key]: value
      })
  }

  [EVENT('refreshSelection') + DEBOUNCE(100)]() {
    this.refreshShow(['rect', 'circle', 'text']);
  }  
}
