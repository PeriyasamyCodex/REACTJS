import { useState } from 'react';
import { TabButton } from "./TabButton";
import Tabs from "./Tabs";
import {  EXAMPLES } from "../data";


export default function Examples() {

    const [selectedTopic, setSelectedTopic] = useState('');

    let tabContent = "Please select a topic."
  
    if (selectedTopic) {
  
      tabContent=(
        <div id="tab-content">
          <h3>{EXAMPLES[selectedTopic].title}</h3>
          <p>{EXAMPLES[selectedTopic].description}</p>
          <pre>
            <code>{EXAMPLES[selectedTopic].code}</code>
          </pre>
        </div>
      );
  
    }
  
    function handleBtnClick(selectedBtn) {
      setSelectedTopic(selectedBtn);
      }
   

    return (
        <section id="examples">
          <h2>Examples</h2>
          <Tabs buttons={
            <menu> <TabButton isBtnSelected={selectedTopic == 'components'} handleBtnClick={() => handleBtnClick('components')}>Components</TabButton>
            <TabButton isBtnSelected={selectedTopic == 'jsx'} handleBtnClick={() => handleBtnClick('jsx')}>JSX</TabButton>
            <TabButton isBtnSelected={selectedTopic == 'props'} handleBtnClick={() => handleBtnClick('props')}>Props</TabButton>
            <TabButton isBtnSelected={selectedTopic == 'state'} handleBtnClick={() => handleBtnClick('state')}>State</TabButton> </menu>
        }>
             {tabContent}
        </Tabs>
            </section>
    );
}