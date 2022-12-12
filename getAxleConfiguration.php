<?php
if(isset($_GET['front']) && $_GET['front'] > 0 && isset($_GET['rear']) && $_GET['rear'] > 0){
    $front = $_GET['front'];
    $rear = $_GET['rear'];
?>
<div class="input-wrap">
    <label class="labelAxleConfig">Click on tyre positions as per your configruation</label>
</div>
<div class="tyreAndAxleWrap">
    <table width="100%" border="0" class="tableAxle" cellspacing="5" cellpadding="5">
        <colgroup>
            <col width="110" />
            <col width="40" />
            <col width="25" />
            <col width="5" />
            <col width="25" />
            <col width="5" />
            <col width="25" />
            <col width="5" />
            <col width="25" />
            <col width="150" />
            <col width="25" />
            <col width="5" />
            <col width="25" />
            <col width="5" />
            <col width="25" />
            <col width="5" />
            <col width="25" />
        </colgroup>
        <tr>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th class="axleLR">L4</th>
            <th>
                <img src="/images/leftArrow.svg" />
            </th>
            <th class="axleLR">L3</th>
            <th>
                <img src="/images/leftArrow.svg" />
            </th>
            <th class="axleLR">L2</th>
            <th>
                <img src="/images/leftArrow.svg" />
            </th>
            <th class="axleLR">L1</th>
            <th>&nbsp;</th>
            <th class="axleLR">R1</th>
            <th>
                <img src="/images/rightArrow.svg" />
            </th>
            <th class="axleLR">R2</th>
            <th>
                <img src="/images/rightArrow.svg" />
            </th>
            <th class="axleLR">R3</th>
            <th>
                <img src="/images/rightArrow.svg" />
            </th>
            <th class="axleLR">R4</th>
        </tr>
        <?
    for($f=1;$f<=$front;$f++){
        //$checked = $f==1 ? "checked":"";
        $checked = "";
    ?>
        <tr>
            <td class="axleType"><?=$f==1?"Front":""?></td>
            <td class="axleNo"><?=$f?></td>
            <?
                for($l=4;$l>=1;$l--){
            ?>
            <td>
                <div class="frontAxleTyre">
                    <input type="checkbox" name="chkFrontAxleTyre[]" id="chkFrontAxleTyre_<?="F".$f."_L".$l?>"
                        value="<?="F".$f."_L".$l?>" <?=$checked?>>
                    <label for="chkFrontAxleTyre_<?="F".$f."_L".$l?>"></label>
                </div>
            </td>
            <?
            if($l!=1){
                echo "<td>&nbsp;</td>";
            }        
                }
            ?>
            <td>
                <img src="/images/axle.svg">
            </td>
            <?
                for($r=1;$r<=4;$r++){
            ?>
            <td>
                <div class="frontAxleTyre">
                    <input type="checkbox" name="chkFrontAxleTyre[]" id="chkFrontAxleTyre_<?="F".$f."_R".$r?>"
                        value="<?="F".$f."_R".$r?>" <?=$checked?>>
                    <label for="chkFrontAxleTyre_<?="F".$f."_R".$r?>"></label>
                </div>
            </td>
            <?
            if($r!=4){
                echo "<td>&nbsp;</td>";
            }
            ?>
            <?        
                }
            ?>
        </tr>
        <?    
    }
    ?>
        <tr>
            <td colspan="17">
                <div class="dashLine"></div>
            </td>
        </tr>
        <?
        for($r=1;$r<=$rear;$r++){
            //$checked = $r==1 ? "checked":"";
            $checked = "";
        ?>
        <tr>
            <td class="axleType"><?=$r==1?"Rear":""?></td>
            <td class="axleNo"><?=$r?></td>
            <?
                for($l=4;$l>=1;$l--){
            ?>
            <td class="rearAxleTyre">
                <input type="checkbox" name="chkRearAxleTyre[]" id="chkRearAxleTyre_<?="R".$r."_L".$l?>"
                    value="<?="R".$r."_L".$l?>" <?=$checked?>>
                <label for="chkRearAxleTyre_<?="R".$r."_L".$l?>"></label>
            </td>
            <?
            if($l!=1){
                echo "<td>&nbsp;</td>";
            }
            ?>
            <?        
                }
            ?>
            <td>
                <img src="/images/axle.svg">
            </td>
            <?
                for($r2=1;$r2<=4;$r2++){
            ?>
            <td class="rearAxleTyre">
                <input type="checkbox" name="chkRearAxleTyre[]" id="chkRearAxleTyre_<?="R".$r."_R".$r2?>"
                    value="<?="R".$r."_R".$r2?>" <?=$checked?>>
                <label for="chkRearAxleTyre_<?="R".$r."_R".$r2?>"></label>
            </td>
            <?
            if($r2!=4){
                echo "<td>&nbsp;</td>";
            }
            ?>
            <?        
                }
            ?>
        </tr>
        <?    
    }
    ?>
    </table>
</div>

<!-- <div class="tyreSpareWrap">
    <div class="spareHeading">
        Spare
    </div>
    <div class="spareTyreWrap">
        <div class="spareTyre" id="spareTyre_1">
            <input type="checkbox" name="chkSpareTyre[]" id="chkSpareTyre_1" value="1" checked="checked">
            <label for="chkSpareTyre_1"></label>
        </div>
    </div>
    <div class="addSpare">
        <img src="/images/addSpare.svg" onclick="addSpareTyre()">
    </div>
</div> -->
<?
}else{
    echo "Front & Rear axle value should not be empty !";
}
?>