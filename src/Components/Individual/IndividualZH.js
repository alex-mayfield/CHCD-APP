
import React, { Component } from 'react';
import Data from '../../Assets/json/full-person.json'
import InstData from '../../Assets/json/full-institution.json'
import CorpData from '../../Assets/json/full-corporate.json'
import EventData from '../../Assets/json/full-event.json'


class Individual extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      prevFilter: ['*']
    };

    this.setFilter = this.setFilter.bind(this);
    this.goBack = this.goBack.bind(this);
    this.checkPrevState = this.checkPrevState.bind(this);
    this.resetPopup = this.resetPopup.bind(this);
  }


  setFilter(e) {
    this.setState({prevFilter: this.state.prevFilter.concat(this.state.filter)})
    let item = e;
    this.setState({filter: item})
    console.log("test3")
  }

  goBack() {
    if (this.state.prevFilter.length === 1 ) {this.setState({ filter: '' });}
    else {this.setState({ filter: this.state.prevFilter.pop()});}
    console.log("test2")
    }

  checkPrevState(){
    if (this.state.prevFilter.length === 1 && this.state.filter === '') {return 'hidden'}
    else { return 'goback'};
    console.log("test1")
  }

  resetPopup() {
    this.props.close();
    this.setState({prevFilter: ['*'] });
    this.setState({filter: ''});
    console.log("test")
  }

  render() {
    //SET TITLE
    var title = '';if (this.state.filter === '') {var title = this.props.init} else {var title = this.state.filter}

    var bigData = Data.concat(InstData).concat(CorpData).concat(EventData)
    var filteredData = '';

    if (this.state.filter === '' && this.props.init) {
      var filteredData = bigData.filter(item => {
        let mainfilter =  `${item.value.corp_name_en}${item.value.event_name_en}${item.value.inst_name_en}${item.value.family_name_en}, ${item.value.given_name_en} (#${item.value._id})`;
        let filter1 = mainfilter.includes(this.props.init);
        if (filter1 && this.props.init) {return true}
        else {return false};
      });
    } else {
      var filteredData = bigData.filter(item => {
        let mainfilter =  `${item.value.corp_name_en}${item.value.event_name_en}${item.value.inst_name_en}${item.value.family_name_en}, ${item.value.given_name_en} (#${item.value._id})`;
        let filter1 = mainfilter.includes(this.state.filter);
        if (filter1 && this.state.filter) {return true}
        else {return false};
      });
    }

    return (
        <div>
        <button className="close" onClick={() => {this.resetPopup()}}/>
        <div className="data"><button className={this.checkPrevState()} onClick={this.goBack}/>

        <div className="forty"><h3> {title} </h3></div>
        {filteredData.map((item, index) => {
          if (item.value._type === "Person") {
            return <div className="sixty">
            <div className="genInf">
            <div className="itemColumn50">
            <b>替代名称：</b> {item.value.alt_name_en}<br/>
            <b>国籍：</b> {item.value.nationality}<br/>
            <b>出生年：</b> {item.value.birth_year}<br/>
            <b>死亡年份：</b> {item.value.death_year}</div>
            <div className="itemColumn50">
            <b>中文名：</b> {item.value.family_name_zh} {item.value.given_name_zh}<br/>
            <b>性别：</b> {item.value.gender}<br/>
            <b>出生在：</b> {item.value.birth_city}<br/>
            <b>死在：</b> {item.value.death_city}</div></div></div>
          }
          else if (item.value._type === "Institution") {
            return <div className="sixty">
            <div className="genInf">
            <div className="itemColumn50">
            <b>替代名称：</b> {item.value.alt_inst_name_en}<br/>
            <b>类型：</b> {item.value.inst_type}<br/>
            <b>开始年份：</b> {item.value.start_year}</div>
            <div className="itemColumn50">
            <b>中文名：</b> {item.value.inst_name_zh}<br/>
            <b>宗教家庭：</b> {item.value.religious_family}<br/>
            <b>结束年份：</b> {item.value.end_year}</div></div></div>
          }
          else if (item.value._type === "CorporateEntity") {
            return <div className="sixty">
            <div className="genInf">
            <div className="itemColumn50">
            <b>替代名称：</b> {item.value.alt_corp_name_en}<br/>
            <b>类型：</b> {item.value.corp_type}<br/>
            <b>开始年份：</b> {item.value.start_year}</div>
            <div className="itemColumn50">
            <b>中文名：</b> {item.value.corp_name__zh}<br/>
            <b>宗教家庭：</b> {item.value.religious_family}<br/>
            <b>结束年份：</b> {item.value.end_year}</div></div></div>
          }
          else if (item.value._type === "Event") {
            return <div className="sixty">
            <div className="genInf">
            <div className="itemColumn50">
            <b>替代名称：</b> {item.value.alt_event_name_en}<br/>
            <b>地点：</b> {item.value.location}<br/>
            <b>开始年份：</b> {item.value.start_year}</div>
            <div className="itemColumn50">
            <b>中文名：</b> {item.value.event_name_zh}<br/>
            <b>结束年份：</b> {item.value.end_year}</div></div></div>
          }
        })}

        {filteredData.map((item, index) => {

          //PEOPLE CONNECTIONS
          if (item.value._type === "Person") {
            //REL,PRES,AFF,PART
            if (item.value.related_to && item.value.present_at && item.value.affiliated_with && item.value.participant_at) {return <div><h4> 个人关系 </h4>{item.value.related_to.map(pers => <div className="itemCard"><div className="itemColumn"> <a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.rel_type}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}<h4> 机构联系 </h4>{item.value.present_at.map(present => <div className="itemCard"><div className="itemColumn"><a value="present.inst_name_en" onClick={(e) => this.setFilter(present.inst_name_en)}>{present.inst_name_en}</a></div><div className="itemColumn">{present.role}</div><div className="itemColumn">{present.start_year}-{present.end_year}</div><div className="itemColumn">{present.source}</div></div>)}<h4> 公司关系 </h4>{item.value.affiliated_with.map(aff => <div className="itemCard"><div className="itemColumn"><a value="aff.corp_name_en" onClick={(e) => this.setFilter(aff.corp_name_en)}>{aff.corp_name_en}</a></div><div className="itemColumn">{aff.rel_type}</div><div className="itemColumn">{aff.start_year}-{aff.end_year}</div><div className="itemColumn">{aff.source}</div></div>)}<h4> 事件连接 </h4>{item.value.participant_at.map(eve => <div className="itemCard"><div className="itemColumn"><a value="eve.event_name_en" onClick={(e) => this.setFilter(eve.event_name_en)}>{eve.event_name_en}</a></div><div className="itemColumn">{eve.role}</div><div className="itemColumn">{eve.start_year}-{eve.end_year}</div><div className="itemColumn">{eve.source}</div></div>)}</div>}
            //PRES, REL, AFF
            else if (item.value.related_to && item.value.present_at && item.value.affiliated_with) {return <div><h4> 个人关系 </h4>{item.value.related_to.map(pers => <div className="itemCard"><div className="itemColumn"> <a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.rel_type}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}<h4> 机构联系 </h4>{item.value.present_at.map(present => <div className="itemCard"><div className="itemColumn"><a value="present.inst_name_en" onClick={(e) => this.setFilter(present.inst_name_en)}>{present.inst_name_en}</a></div><div className="itemColumn">{present.role}</div><div className="itemColumn">{present.start_year}-{present.end_year}</div><div className="itemColumn">{present.source}</div></div>)}<h4> 公司关系 </h4>{item.value.affiliated_with.map(aff => <div className="itemCard"><div className="itemColumn"><a value="aff.corp_name_en" onClick={(e) => this.setFilter(aff.corp_name_en)}>{aff.corp_name_en}</a></div><div className="itemColumn">{aff.rel_type}</div><div className="itemColumn">{aff.start_year}-{aff.end_year}</div><div className="itemColumn">{aff.source}</div></div>)}</div>}
            //PRES, REL, PART
            else if (item.value.related_to && item.value.present_at && item.value.participant_at) {return <div><h4> 个人关系 </h4>{item.value.related_to.map(pers =><div className="itemCard"><div className="itemColumn"> <a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.rel_type}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}<h4> 机构联系 </h4>{item.value.present_at.map(present =><div className="itemCard"><div className="itemColumn"><a value="present.inst_name_en" onClick={(e) => this.setFilter(present.inst_name_en)}>{present.inst_name_en}</a></div><div className="itemColumn">{present.role}</div><div className="itemColumn">{present.start_year}-{present.end_year}</div><div className="itemColumn">{present.source}</div></div>)}<h4> 事件连接 </h4>{item.value.participant_at.map(eve =><div className="itemCard"><div className="itemColumn"><a value="eve.event_name_en" onClick={(e) => this.setFilter(eve.event_name_en)}>{eve.event_name_en}</a></div><div className="itemColumn">{eve.role}</div><div className="itemColumn">{eve.start_year}-{eve.end_year}</div><div className="itemColumn">{eve.source}</div></div>)}</div>}
            //PRES, AFF, PART
            else if (item.value.present_at && item.value.affiliated_with && item.value.participant_at) {return <div><h4> 机构联系 </h4>{item.value.present_at.map(present =><div className="itemCard"><div className="itemColumn"><a value="present.inst_name_en" onClick={(e) => this.setFilter(present.inst_name_en)}>{present.inst_name_en}</a></div><div className="itemColumn">{present.role}</div><div className="itemColumn">{present.start_year}-{present.end_year}</div><div className="itemColumn">{present.source}</div></div>)}<h4> 公司关系 </h4>{item.value.affiliated_with.map(aff =><div className="itemCard"><div className="itemColumn"><a value="aff.corp_name_en" onClick={(e) => this.setFilter(aff.corp_name_en)}>{aff.corp_name_en}</a></div><div className="itemColumn">{aff.rel_type}</div><div className="itemColumn">{aff.start_year}-{aff.end_year}</div><div className="itemColumn">{aff.source}</div></div>)}<h4> 事件连接 </h4>{item.value.participant_at.map(eve =><div className="itemCard"><div className="itemColumn"><a value="eve.event_name_en" onClick={(e) => this.setFilter(eve.event_name_en)}>{eve.event_name_en}</a></div><div className="itemColumn">{eve.role}</div><div className="itemColumn">{eve.start_year}-{eve.end_year}</div><div className="itemColumn">{eve.source}</div></div>)}</div>}
            //REL, AFF, PART
            else if (item.value.related_to && item.value.affiliated_with && item.value.participant_at) {return <div><h4> 个人关系 </h4>{item.value.related_to.map(pers =><div className="itemCard"><div className="itemColumn"> <a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.rel_type}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}<h4> 机构联系 </h4>{item.value.present_at.map(present =><div className="itemCard"><div className="itemColumn"><a value="present.inst_name_en" onClick={(e) => this.setFilter(present.inst_name_en)}>{present.inst_name_en}</a></div><div className="itemColumn">{present.role}</div><div className="itemColumn">{present.start_year}-{present.end_year}</div><div className="itemColumn">{present.source}</div></div>)}<h4> 公司关系 </h4>{item.value.affiliated_with.map(aff =><div className="itemCard"><div className="itemColumn"><a value="aff.corp_name_en" onClick={(e) => this.setFilter(aff.corp_name_en)}>{aff.corp_name_en}</a></div><div className="itemColumn">{aff.rel_type}</div><div className="itemColumn">{aff.start_year}-{aff.end_year}</div><div className="itemColumn">{aff.source}</div></div>)}<h4> 事件连接 </h4>{item.value.participant_att.map(eve =><div className="itemCard"><div className="itemColumn"><a value="eve.event_name_en" onClick={(e) => this.setFilter(eve.event_name_en)}>{eve.event_name_en}</a></div><div className="itemColumn">{eve.role}</div><div className="itemColumn">{eve.start_year}-{eve.end_year}</div><div className="itemColumn">{eve.source}</div></div>)}</div>}
            //REL, PRES
            else if (item.value.related_to && item.value.present_at) {return <div><h4> 个人关系 </h4>{item.value.related_to.map(pers =><div className="itemCard"><div className="itemColumn"> <a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.rel_type}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}<h4> 机构联系 </h4>{item.value.present_at.map(present =><div className="itemCard"><div className="itemColumn"><a value="present.inst_name_en" onClick={(e) => this.setFilter(present.inst_name_en)}>{present.inst_name_en}</a></div><div className="itemColumn">{present.role}</div><div className="itemColumn">{present.start_year}-{present.end_year}</div><div className="itemColumn">{present.source}</div></div>)}</div>}
            //REL, AFF
            else if (item.value.related_to && item.value.affiliated_with) {return <div><h4> 个人关系 </h4>{item.value.related_to.map(pers =><div className="itemCard"><div className="itemColumn"> <a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.rel_type}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}<h4> 公司关系 </h4>{item.value.affiliated_with.map(aff =><div className="itemCard"><div className="itemColumn"><a value="aff.corp_name_en" onClick={(e) => this.setFilter(aff.corp_name_en)}>{aff.corp_name_en}</a></div><div className="itemColumn">{aff.rel_type}</div><div className="itemColumn">{aff.start_year}-{aff.end_year}</div><div className="itemColumn">{aff.source}</div></div>)}</div>}
            //REL, PART
            else if (item.value.related_to && item.value.participant_at) {return <div><h4> 个人关系 </h4>{item.value.related_to.map(pers =><div className="itemCard"><div className="itemColumn"> <a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.rel_type}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}<h4> 事件连接 </h4>{item.value.participant_at.map(eve =><div className="itemCard"><div className="itemColumn"><a value="eve.event_name_en" onClick={(e) => this.setFilter(eve.event_name_en)}>{eve.event_name_en}</a></div><div className="itemColumn">{eve.role}</div><div className="itemColumn">{eve.start_year}-{eve.end_year}</div><div className="itemColumn">{eve.source}</div></div>)}</div>}
            //PRES, AFF
            else if (item.value.present_at && item.value.affiliated_with) {return <div><h4> 机构联系 </h4>{item.value.present_at.map(present =><div className="itemCard"><div className="itemColumn"><a value="present.inst_name_en" onClick={(e) => this.setFilter(present.inst_name_en)}>{present.inst_name_en}</a></div><div className="itemColumn">{present.role}</div><div className="itemColumn">{present.start_year}-{present.end_year}</div><div className="itemColumn">{present.source}</div></div>)}<h4> 公司关系 </h4>{item.value.affiliated_with.map(aff =><div className="itemCard"><div className="itemColumn"><a value="aff.corp_name_en" onClick={(e) => this.setFilter(aff.corp_name_en)}>{aff.corp_name_en}</a></div><div className="itemColumn">{aff.rel_type}</div><div className="itemColumn">{aff.start_year}-{aff.end_year}</div><div className="itemColumn">{aff.source}</div></div>)}</div>}
            //PRES, PART
            else if (item.value.present_at && item.value.participant_at) {return <div><h4> 机构联系 </h4>{item.value.present_at.map(present =><div className="itemCard"><div className="itemColumn"><a value="present.inst_name_en" onClick={(e) => this.setFilter(present.inst_name_en)}>{present.inst_name_en}</a></div><div className="itemColumn">{present.role}</div><div className="itemColumn">{present.start_year}-{present.end_year}</div><div className="itemColumn">{present.source}</div></div>)}<h4> 事件连接 </h4>{item.value.participant_at.map(eve =><div className="itemCard"><div className="itemColumn"><a value="eve.event_name_en" onClick={(e) => this.setFilter(eve.event_name_en)}>{eve.event_name_en}</a></div><div className="itemColumn">{eve.role}</div><div className="itemColumn">{eve.start_year}-{eve.end_year}</div><div className="itemColumn">{eve.source}</div></div>)}</div>}
            //AFF, PART
            else if (item.value.affiliated_with && item.value.participant_at) {return <div><h4> 公司关系 </h4>{item.value.affiliated_with.map(aff =><div className="itemCard"><div className="itemColumn"><a value="aff.corp_name_en" onClick={(e) => this.setFilter(aff.corp_name_en)}>{aff.corp_name_en}</a></div><div className="itemColumn">{aff.rel_type}</div><div className="itemColumn">{aff.start_year}-{aff.end_year}</div><div className="itemColumn">{aff.source}</div></div>)}<h4> 事件连接 </h4>{item.value.participant_at.map(eve =><div className="itemCard"><div className="itemColumn"><a value="eve.event_name_en" onClick={(e) => this.setFilter(eve.event_name_en)}>{eve.event_name_en}</a></div><div className="itemColumn">{eve.role}</div><div className="itemColumn">{eve.start_year}-{eve.end_year}</div><div className="itemColumn">{eve.source}</div></div>)}</div>}
            //PRES
            else if (item.value.present_at) {return <div><h4> 机构联系 </h4>{item.value.present_at.map(present =><div className="itemCard"><div className="itemColumn"><a value="present.inst_name_en" onClick={(e) => this.setFilter(present.inst_name_en)}>{present.inst_name_en}</a></div><div className="itemColumn">{present.role}</div><div className="itemColumn">{present.start_year}-{present.end_year}</div><div className="itemColumn">{present.source}</div></div>)}</div>}
            //REL
            else if (item.value.related_to) {return <div><h4> 个人关系 </h4>{item.value.related_to.map(pers =><div className="itemCard"><div className="itemColumn"> <a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.rel_type}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}</div>}
            //AFF
            else if (item.value.affiliated_with) {return <div><h4> 公司关系 </h4>{item.value.affiliated_with.map(aff =><div className="itemCard"><div className="itemColumn"><a value="aff.corp_name_en" onClick={(e) => this.setFilter(aff.corp_name_en)}>{aff.corp_name_en}</a></div><div className="itemColumn">{aff.rel_type}</div><div className="itemColumn">{aff.start_year}-{aff.end_year}</div><div className="itemColumn">{aff.source}</div></div>)}</div>}
            //PART
            else if (item.value.participant_at) {return <div><h4> 事件连接 </h4>{item.value.participant_at.map(eve =><div className="itemCard"><div className="itemColumn"><a value="eve.event_name_en" onClick={(e) => this.setFilter(eve.event_name_en)}>{eve.event_name_en}</a></div><div className="itemColumn">{eve.role}</div><div className="itemColumn">{eve.start_year}-{eve.end_year}</div><div className="itemColumn">{eve.source}</div></div>)}</div>}
        }
        //INSTITUTION CONNECTIONS
        else if (item.value._type === "Institution") {
          //PRES, CON, OF
          if (item.value.present_at && item.value.part_of && item.value.connected_to) {return <div><h4> 人员连接 </h4>{item.value.present_at.map(pers =><div className="itemCard"><div className="itemColumn"><a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.role}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}<h4> 公司关系 </h4>{item.value.part_of.map(part =><div className="itemCard"><div className="itemColumn"><a value="part.corp_name_en" onClick={(e) => this.setFilter(part.corp_name_en)}>{part.corp_name_en}</a></div><div className="itemColumn">{part.rel_type}</div><div className="itemColumn">{part.start_year}-{part.end_year}</div><div className="itemColumn">{part.source}</div></div>)}<h4> 机构联系 </h4>{item.value.connected_to.map(inst =><div className="itemCard"><div className="itemColumn"><a value="inst.inst_name_en" onClick={(e) => this.setFilter(inst.inst_name_en)}>{inst.inst_name_en}</a></div><div className="itemColumn">{inst.rel_type}</div><div className="itemColumn">{inst.start_year}-{pers.end_year}</div><div className="itemColumn">{inst.source}</div></div>)}</div>}
          //PRES, OF
          else if (item.value.present_at && item.value.part_of) {return <div><h4> 人员连接 </h4>{item.value.present_at.map(pers =><div className="itemCard"><div className="itemColumn"><a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.role}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}<h4> 公司关系 </h4>{item.value.part_of.map(part =><div className="itemCard"><div className="itemColumn"><a value="part.corp_name_en" onClick={(e) => this.setFilter(part.corp_name_en)}>{part.corp_name_en}</a></div><div className="itemColumn">{part.rel_type}</div><div className="itemColumn">{part.start_year}-{part.end_year}</div><div className="itemColumn">{part.source}</div></div>)}</div>}
          //PRES, CON
          else if (item.value.present_at && item.value.connected_to) {return <div><h4> 人员连接 </h4>{item.value.present_at.map(pers =><div className="itemCard"><div className="itemColumn"><a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.role}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}<h4> 机构联系 </h4>{item.value.connected_to.map(inst =><div className="itemCard"><div className="itemColumn"><a value="inst.inst_name_en" onClick={(e) => this.setFilter(inst.inst_name_en)}>{inst.inst_name_en}</a></div><div className="itemColumn">{inst.rel_type}</div><div className="itemColumn">{inst.start_year}-{pers.end_year}</div><div className="itemColumn">{inst.source}</div></div>)}</div>}
          //CON, OF
          else if (item.value.part_of && item.value.connected_to) {return <div><h4> 公司关系 </h4>{item.value.part_of.map(part =><div className="itemCard"><div className="itemColumn"><a value="part.corp_name_en" onClick={(e) => this.setFilter(part.corp_name_en)}>{part.corp_name_en}</a></div><div className="itemColumn">{part.rel_type}</div><div className="itemColumn">{part.start_year}-{part.end_year}</div><div className="itemColumn">{part.source}</div></div>)}<h4> 机构联系 </h4>{item.value.connected_to.map(inst =><div className="itemCard"><div className="itemColumn"><a value="inst.inst_name_en" onClick={(e) => this.setFilter(inst.inst_name_en)}>{inst.inst_name_en}</a></div><div className="itemColumn">{inst.rel_type}</div><div className="itemColumn">{inst.start_year}-{pers.end_year}</div><div className="itemColumn">{inst.source}</div></div>)}</div>}
          //PART
          else if (item.value.part_of) {return <div><h4> 公司关系 </h4>{item.value.part_of.map(part =><div className="itemCard"><div className="itemColumn"><a value="part.corp_name_en" onClick={(e) => this.setFilter(part.corp_name_en)}>{part.corp_name_en}</a></div><div className="itemColumn">{part.rel_type}</div><div className="itemColumn">{part.start_year}-{part.end_year}</div><div className="itemColumn">{part.source}</div></div>)}</div>}
          //CON
          else if (item.value.connected_to) {return <div><h4> 机构联系 </h4>{item.value.connected_to.map(inst =><div className="itemCard"><div className="itemColumn"><a value="inst.inst_name_en" onClick={(e) => this.setFilter(inst.inst_name_en)}>{inst.inst_name_en}</a></div><div className="itemColumn">{inst.rel_type}</div><div className="itemColumn">{inst.start_year}-{pers.end_year}</div><div className="itemColumn">{inst.source}</div></div>)}</div>}
          //PRES
          else if (item.value.present_at) {return <div><h4> 人员连接 </h4>{item.value.present_at.map(pers =><div className="itemCard"><div className="itemColumn"><a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.role}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}</div>}
        }
        //公司关系
        else if (item.value._type === "CorporateEntity") {
          //OF, AFF
          if (item.value.affiliated_with && item.value.participant_at) {return <div>
          <h4> 人员连接 </h4>{item.value.affiliated_with.map(pers =><div className="itemCard"><div className="itemColumn"><a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.rel_type}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}
          <h4> 机构联系 </h4>{item.value.part_of.map(part =><div className="itemCard"><div className="itemColumn"><a value="part.inst_name_en" onClick={(e) => this.setFilter(part.inst_name_en)}>{part.inst_name_en}</a></div><div className="itemColumn">{part.rel_type}</div><div className="itemColumn">{part.start_year}-{part.end_year}</div><div className="itemColumn">{part.source}</div></div>)}</div>}
          //OF
          else if (item.value.part_of) {return <div><h4> 机构联系 </h4>{item.value.part_of.map(part =><div className="itemCard"><div className="itemColumn"><a value="part.inst_name_en" onClick={(e) => this.setFilter(part.inst_name_en)}>{part.inst_name_en}</a></div><div className="itemColumn">{part.rel_type}</div><div className="itemColumn">{part.start_year}-{part.end_year}</div><div className="itemColumn">{part.source}</div></div>)}</div>}
          //AFF
          else if (item.value.affiliated_with) {return <div><h4> 人员连接 </h4>{item.value.affiliated_with.map(pers =><div className="itemCard"><div className="itemColumn"><a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.rel_type}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}</div>}
        }
          //事件连接
          else if (item.value._type === "Event") {
          //PART
          if (item.value.participant_at) {return <div><h4> Participants </h4>{item.value.participant_at.map(pers =><div className="itemCard"><div className="itemColumn"><a value="{pers.family_name_en}, {pers.given_name_en}" onClick={(e) => this.setFilter(`${pers.family_name_en}, ${pers.given_name_en}`)}>{pers.family_name_en}, {pers.given_name_en}</a></div><div className="itemColumn">{pers.role}</div><div className="itemColumn">{pers.start_year}-{pers.end_year}</div><div className="itemColumn">{pers.source}</div></div>)}</div>}
        }

      })}
        </div>
        </div>
    );
  }
}

export default Individual;
