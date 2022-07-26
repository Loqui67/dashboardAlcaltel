/* ------------------- Composants ------------------- */

import ChooseCharts from "../Charts/ChooseCharts";
import SelectTS from "../Search Options-Results/SelectTS";
import SelectDate from "../Search Options-Results/SelectDate";
import SelectModel from "../Search Options-Results/SelectModel";
import Label from "../HTML components/Label";

/* ------------------- Classes ------------------- */

import SelectClientVersion from "../Search Options-Results/SelectClientVersion";

function StatsGraphPartStructure() {
    return (
        <div className="UpPart">
            <div className="d-flex flex-row padding">
                <div className="selectTS padding">
                    <Label text="Choose a test suite" />
                    <SelectTS />
                </div>
                <div className="selectDate padding">
                    <Label text="Choose a date" />
                    <SelectDate />
                </div>
                <div className="selectClientVersion padding">
                    <Label text="Choose a client version" />
                    <SelectClientVersion />
                </div>
                <div className="selectModel padding">
                    <Label text="Choose a model" />
                    <SelectModel />
                </div>
            </div>
            <div className="Graph padding">
                <ChooseCharts />
            </div>
        </div>
    );
}

export default StatsGraphPartStructure;
