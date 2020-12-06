<template>
    <div class="question">
        <div class="q-title">
            <span>题型：选择题</span>
            <span>难易度：较难</span>
        </div>
        <div class="q-container ql-editor" v-html="content"></div>
        <div class="q-answer" v-if="answerVisible">
            <div class="answer">
                <span>答案：</span>B、D
            </div>
            <div class="analysis">
                <span>解析：</span>
                <div>内容李娟、楚金玲等5人在这次全国选拔中脱颖而出，以主攻手人选的身份进入中国排协公布的新一届国家女排20人大名单。</div>
            </div>
        </div>
        <div class="q-btns">
            <el-button type="text" icon="el-icon-notebook-1" @click="onAnswerToggle">查看解析</el-button>
            <div class="btn-slot">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
// import {} from ''
export default {
    name: 'QuestionItem',
    data () {
        return {
            answerVisible: false,
            content: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">水循环包括自然循环和社会循环。读图1，回答（1）～（2）题。</span></p><p class="ql-align-center"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/wAALCACRASkBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/APZKKKKKKKKD0NVNKvBqOlW14E8sTxh9u7OM+9W6gvruOwsLi8l+5BG0jfQDNYngLXpfEfhCz1G5z9pO5JgRj5gSP5YP410VFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFVdTupLHTLm7igNw8ETSCIHBfAzgH1rN8Ha23iHwxaao1iLJZgdkSnIwDjI9AcGtyggHggEVQ0O6F7o1tdCBIPNTPlxjAXmr9FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFY1++oXGvxWFrqDWcX2VpmKxK5YhwB94H1pDY6i0xtj4kkMhTcY/s0OSvTOMdKhtdEutI0+O0g8QvBbWseApt4QEQdzx096nex1KKIyyeJZUjAyWa2hAx9cUfY9R+0G3/4SaTzgocx/Z4dwXOM4x0yKPsGpJhf+EkkXrgfZoR069qiB1G01PTQ+sNe293IysphjAI8tmBBUeoFb1FFY91eX1/qEmnaXIsCwY+1XjLu8skZCIp4LYwSTwARwc0f8I+4G5Nb1US/89DOCM/7pXb+lO0+/vIb86VqmxpyhkguI12rcIOvH8LDIyPfI9taiiiiiiiiisbUZL+bXbewtL9rONrWSZysSuWIZAPvDj7xpv2a+Of+KpbgkH9xDwR17UotNQa3+0L4ncw7d3mC3hK49c46VHd22rQ6bNdw+IpHCQtIh+zRENhcjt0rW0+Z7jTbWeQgvLCjsQMclQTViiiiiisZdT1a6u7yOysLRorWfyd01yysxCq2cBD/AHvWpPP8Rf8AQP07/wADH/8AjdHn+Iv+gfp3/gY//wAbo8/xF/0D9O/8DH/+N1Rhlvv+EqL6jHb2u3TnIaGYuAPMXJOVGKxJ57tdba91G8uYrOW1YylAFkigMuEJIGQOASeoDH0rZ1CxGtauYI5lkhW2WQll4KMeFDD7yttyR7e9ZWqv/wAU5qQeZftsVyTIiqz4WMkoMKOAcA88YJqpZ3E51qFDHJFIJ1VpY3ZSB5pj2nOcrgcAnHXvWlqiyX1zd20EUElyLxPlt3O5l2LvYgnA+QsueOuOtT3kt49roj6QLeSf7RL5K3RdFA8t/lbgsCOnTtSaJN4/drv+17XSUYSDyQsjBNuOxAJP41q7vE//ADx0n/v7L/8AE0bvE/8Azx0n/v7L/wDE0nhXedJkacILlru4NxsJI3+Y2evOMYx7YqpdxIPGWn3NqY5ctJDc7JiZEJQkbl6bBgcepBqx4l88PpbWQiN4L0CESkhT+7fdkjnG3NZmlzfEJtUuhqdrpCW4QeR5cjbCc884LZ6dQKvzX/iSG/trM22ll7hXZWE0mBtxnPy+9WN3if8A546T/wB/Zf8A4mjd4n/546T/AN/Zf/iaN3if/njpP/f2X/4mjd4n/wCeOk/9/Zf/AImjd4n/AOeOk/8Af2X/AOJo3eJ/+eOk/wDf2X/4mjd4n/546T/39l/+Jo3eJ/8AnjpP/f2X/wCJqtaHUj4vh/tFLRT9gl2fZ3Zv+Wkec7gKzrSORrnTpFQhJLq8dTuQbgWfB5HfrUYe4bwTp1rZzGLdYl7gIq7ViCNnPHVjgfme1WNKnT+wb62ubuV9QjsBvikbC+X5Z2si9MEdT1zkHpXRaR/yBbH/AK9o/wD0EVcooooorJ0P/j51j/sIN/6LjrWoorE1H7RbeIYrxdOnvIDZtE3khDht6kZDEdhSLfKl3Ldr4Z1ATyoEkkCRZZRnAPz+5ptpraXKrqFt4f1FvPiUCUJGCyDJA+/05P50PcxSSzSv4WvjJcRiOZvLizIo6AnfyOTUS/ZEm85fCd8JPNEu7ZFneCSD9/1Yn8adM9rcRrHL4Ru3Vc7QYYeMnJ/j9abbxs+oaZFaaHc2FtbTSSO0gQKMxsOzEk5Iro6KKxrm2vdL1GXUNPgN1b3JDXVorAOGAx5keeCcAAqcZwCDnq0eJrAytHHZag13tDNAtk4kweBnIxjg8k44qSxs7y71AarqcawvGhS1tQ27yQfvMxHBc4A44A45ya16yr7/AJGXSv8ArlcfyStWiiiiiiisTUxcQa9b3aafcXkBtJYX8jbkEshGcsOwNI98skaRv4Yv2RFKqpjiIUEYIA3+nFVodTsb2xn06Hw3eSW0B+zSwrHFtXaB8mN/YEVNe6jcTabcW0Ph7UVZ4GjT5YgBlSAPv9K1tNieDTLSGRdrxworD0IUA1Zooooorl/B2vWes3uupaLMDDfkyeZHt2kqq4+uUP6V1FFFFVtRvBp+m3N60TyrbxNIyR/eYAZOPfFY/gPU49W8HafdRQyRx+XsXzAAW2nBP0yDXQ1Be3tvp9o91dSCOKPq2M+wAA5JJ4AHWs9dW1SUb4fD1x5Z+6Zp442I91ySPxpf7S1n/oXn/wDAuOk/tLWf+hef/wAC46n0/WI724ktJYJrO8jXc1vOBu29NykEhhnjIP1xWhRXIWVjqy/FPUb6SeE2L2ESCEE7guW2n0zuV/8AvquvorKvv+Rl0r/rlcfyStWiorq6gsrWS5uZVihiXc7t0ArMXWNSnUSW3h+5aI/daaVImYeu0nI/HBp39paz/wBC8/8A4Fx0f2lrP/QvP/4Fx1LY6wl1dGyuLaayvAu/yZsfOvcqwJDD1wcjuK0aKK5HwNo11pV3r8k9/wDahc6i7sCm3a+ASRz0IIH4V11FFFFYVnq2t6hb/arXS7LyWd1QyXrKxCsVyQIzjp61N9p8R/8AQL07/wADn/8AjdH2nxH/ANAvTv8AwOf/AON1n6Vp2s6RLfyW2k6cGv7prmT/AE5/vEAf88/b9a0PtPiP/oF6d/4HP/8AG6PtPiP/AKBenf8Agc//AMbqbStQurya7t7y1it5rV1UiKUyKwKhgckD19K0SQASTgDqTWGNR1DWkY6TbQLYtlRdXe4iYdCUQYJX3JGe2RVfT4NU8LaVb2YtLe90+0jCf6IGSZVHfYSQ30BB9Aa37W5gvbaO5tpVlhlUMjr0YGszVQJdc0WBxuj82WXaem5U+U/huJqTW7y6t1trazwst47RCUqW8rCM27A69Kgj1q4WDVfNt976ftVAitukJQNyCOOTWPYeI9Zup7CPajF0YHIUC4I2jOcjaSRLtxwdvetzWVC32j3KjEi3nl577WRtw+nAP4CteismD/kbr7/rxt//AEOWtbpyab5if31/MVyOu/2ufiH4f+yXYXT3jm88bVO3bgnntu+UfhXXeYn99fzFKGDDIIP0NZWtoJrvSIH5je9DMvZtsbsufowB/Co9c1h9LvtOjV4gLmby/LeQKZBg56jjHB68njvSaTq8sv8AaDXiTCOG6kVXZRhVGMLgck8+lQf2tqdrO99cWtxLaynAtUj+e3Rf4yTwSe4zxxjPObWubWTS7pVKyJfQ7CRggOdrD8QxrYrN1DVpLS+hsrfTp72aWJpcRuihVUgHJYjuwqL+1tV/6Fu7/wDAiD/4uqWm3GsWT3rP4duW+03TTLtuIeAQowfn68Vam1vUbeCSeTw5eBI1LsfPhOABk/x1q2063VrFcICFlRXAPUAjNS0UVj+GGVPDcLuQqq8xJPQDzGpnhO7mutJP2l2NwJGkYOcsEcl0/DawH4Y7VJcG7j1qzs1v5hFPDM7/ACpnKlMYOP8AaNY/iC8lsdWigbVLiGJII+Q43Mx8wZK8Z6An6Dtml8IXd9/pUMvnyJEuyJ5ZD5SKh28kjJY8knkdKj0rWtTv9fmUiG1W7jheIyMzrsBc4VePmZMH8+uK3dM/5Dms/wDXWL/0UtJ4my+kfZgxVbueK3dgcYR3Ct+YJH41qKiogjjUIqjCgDgDtWb4bvLi/wBFjuLuQSTGWVSwULkLIyjgewFR6KottS1eyj4hjuFlRey+YgZgP+BZP/AqXUf+Rk0b/tv/AOgCpNWtIbq7sDNcxReVI7KkgB8w7COOe2c1RgsYs6vBZ6lbGW5ZGIQ/6obQvIB77T6U270u2ezmgOo2cUJOQGRcLtYFMnP8IBHGOvbFXtbx5uk46fb0x/3w9atFZMH/ACN19/142/8A6HLSeKlV/DV6jAFWVQQe43Cs/UbXwnpl2ttPo9jvaGSbiFOiY4+p3cfSnaXY+F9Ujdo9Es4mRipV4EzwcZyOKI7Pwk91PbtpenIYZkhDGJMSOyhgF/P9DVrQrS2sdU1i3tII4IVmjIjjUKozEueBU2r/APIS0X/r8b/0TJRqtjbT31hcSzwwtFIxAkUHzf3bDHPpkn8KZp8NtBdXMMOqRTmR3nmhwpwWwOcdBxWcmjmBJZp9W04TPKHnYwDYwHVCGYgLjjjGOtaeulWtbAoQVN9blSOmN4rWrHuGK+LIGAyRp0xHGf8AlpH2rmYvFGpSWsUc9z9muEmZm3xMvzbmwjdfkyCDjB4Ard1LX7mHw7Fdpa/vryMiPypPuEqzbhkA4AGelJZ6hd6n4VubmeNEiNiQpL5kZwh3lh0HP41raR/yBbH/AK9o/wD0EVcoorkNK1LRTocNlf6nFD5csolgaQLu/eNw3fHt3q5cal4an1CG+XWooJ4l2boZwokT+6w6EA8j07U5tU8Nvcx3La3GZYlZUb7T0DYz/IflUBuvCU1w8txqtpd7oRCVnlEmACx6nnPzEfSi0n8I2kMsa6jZnzXdmbzACVZtxTI/h7Y9BTXm8Jzy3b3WrW9wt00bbHmAEWz7uwrgjBJOevNX9Bure91PV57SZZoTNEFdDkHES55rQ1WwGp6bNaGQxs4BSQDJRwcq34EA1Tsdehciz1RksdRQYeKRtqv/ALUbHhlPtyO9R/2ho+gWws7N/OkZmaK0gfzZXZiScDJwCSTk4Aq1otlPa20s15t+2XcpmnCnIUkABAe4VQBnvjPeodR/5GTRv+2//oArI8Wwyz3yRL8qyW7KvzcyMXjXbjsvzZ9yB6VR0a9DR3Mk7gRXFp9rICMyhnYKBsHXoMcZ5pba01CCTSG+xwtNHZy+XaTQqhkYKmST2Y52gn6nqa6TWSS+jkrsJvk+U9vkfiteismD/kbr7/rxt/8A0OWl8Uf8i5d/Rf8A0IVmeILC6u9ZZozcyKunT7VAKxoSUwAVwSxweCT0pdEsr+HTrhvIXfI7JHHKG+U54YgnGB14GTVPRtHm0nU57jTdPM0cMqWzrMvlM6iNQZEJ4yG3Z9QTzwK3tM/5Des/9dov/RS0av8A8hLRf+vxv/RMlZHjG3luZo4QCEltpkyG+Z2IChQOwywz68elUNBuTHPJPczbIriCS4YAM6gqUjHyj7wx7dTTLOy1GKPQd9vH5scUixW88Cp5jiLJLdx0Kg9eSTXTayzNYaazxeUxvbYmPIOw7xxx6VsViXkkEfiy3FxKkavp8y5Z9uf3kfQ1kP4V0kzbk1W2WMM7bCQc7mcjJ3ZONw69cVpSWFk+ki0Grweelp9mjmYqQmRhmC56n60ye20rT9Ov5re/XdJZlHT7QNjsqYD7c4DEAAkdcVr6R/yBbH/r2j/9BFXKKKTA9B+VGB6D8qMD0H5Vk6GB9p1jgf8AIQbt/wBM461sD0H5UYHoPypcAdBRVe+is5bZvt0cDwKMt56gqPc54rK8HQ2Mfhuyezit1ZoVEjQqvLY5yR3rdrO1ixuLqOCeydEvLSTzYfM+63BDK2OxBIz24PaqjaoHljlu/DmoC4iyAViSQLnrtYNyKZb39paMrW3hvUIWWMRgx2ijCjt16VMdbRpFlbQtULoCFY2wyAeuOfYUQRXuranBe3dq1naWhLQQSEGSSQgrvYAkKACQBnPOTWzRWTB/yN19/wBeNv8A+hy1a1axOp6XPZrL5LSrgSbd20gg5x36VV+x+If+gzZ/+AB/+OVUnbxFDqdpZ/2rZEXKSNu+wn5duP8App3zVr7H4h/6DNl/4AH/AOOVNpWnXNlLdz3d2lzNdOrMY4fLVcKFAxk+nrTtXsJb61Q20ixXVvIJrd3GVDjs3sQSD7GqLaozvE994dvvtMP3THGsqqe5Vgen5U2C/tLVle38N6hEyKUUpaKCFJyR19QKmbW1d0dtC1QumdrG2GVzwcc01Uvdav7aa4tHsrG0fzUjmI82aTBCkgE7VGSeuScdMc7dc34+ZbfwfqN0lil1dRwMsGYRIyM3GRxxjr+FT6DYabqGg2N3PotrFNLAjSI9qoZWx8wIx65q/wD2JpH/AECrL/wHT/CuTlSFfilBpo0GE6adPYNJ9kXZ5u4NnOPQBfqa7lVCqFUAADAA6ClooooorJ0P/j51j/sIN/6LjrWooorH1zUNMe3uNIuWeeW5hZHt7eJpXCsMZKqDgc98VkeB5LDw/wCHdO0GfzbS6VcFbmFovNkJJO0kYJyegOa6+iiiiiiismD/AJG6+/68bf8A9DlrWorKvv8AkZdK/wCuVx/JK1aKKKKKKKz/ABB/yLmp/wDXpL/6CauW3/HrF/uL/KpKyW/5HGL/ALBz/wDoxa1qKKKKKK5601D+y7/VI7iw1BvNvDIjRWjyKylEGQQMdQat/wDCRwf9A/Vf/BfL/hR/wkcH/QP1X/wXy/4U1vEkAUkafqnAzzYSj+lYNj8RU1vS5GsNJ1G2unKxQtcWxMIkZgqneOCMnPbpXS2tlDoWmsttDJcSfedhzJcSHqzE9ST3PA+gqOzubfxHp1zDeWDIEla3uLefDYYY6EcHqCCKboc8kS3Wm3U/mS2EvlrI7fM8ZAZCfU4OCe5XNavmx/8APRf++hR5sf8Az0X/AL6FHmRn+NfzFOooorJg/wCRuvv+vG3/APQ5a1qKyr7/AJGXSv8ArlcfyStWiiiiiiis/wAQf8i5qf8A16S/+gmrlt/x6xf7i/yqSslv+Rxi/wCwc/8A6MWtaiiiiiiua0jQtM1CC5ubu1E0zXtwC7M2SBKwHf0FX/8AhFdD/wCgen/fTf40f8Irof8A0D0/76b/ABpP+EV0MjB06P8A76b/ABqnqvhixg0/7RpmnqLu0dJ4VUn5ijBto5xyAR+Nawu21LSPtWkzxFpo8wySAlVPuBzx3HqKj0q2uNPsXW+kthtYuXiBA9WZix5JOSTWbpml6frc15rN5YQzreSj7MZowT5KqFU89mILD2IrQ/4RrQv+gPZf9+V/wo/4RrQv+gPZf9+V/wAKzfEWg6PbaBeTQaZaxSpHuV0iAKnI5BrpaKrT6jY2snl3F7bwvjO2SVVP5E1H/bWlf9BSz/8AAhf8ay4NX0weK71zqVptNlAAfPXBO+X3rU/trSv+gpZ/+BC/40f21pX/AEFLP/wIX/GuS1y6ab4haBcWmvQpp4jl+0otwm0bcEfTdkD8K7S3vLW7DG2uYZwv3jE4bH1xU1FFFFVp9RsbWTy7i9t4XxnbJKqn8iaj/trSv+gpZ/8AgQv+NUNe1fS38Paiq6laMxtZAAJ1yflPvV201bTXhgjTUbRnKqAonUknHTGavMyopZ2CqoySTgAVy7+JNGHitJ/7RhMK2TxmUElA3mKcbunb1rpopY54llhkWSNxlXRshh7EU+iiiiisnw3/AMg+4/6/rr/0c9a1FZV3qt6mqPY2Wmi6MUSSu7XAjA3FgByDn7ppP7Q1z/oBR/8Agcv/AMTWVNY6wLqS6sNNk06aU7pfIvkKSN6sjIRn3GDTG0/XLth/alnLqEanPkPeRxxH/eVUG76Eke1a4v8AXAMDQYwP+v1f/iab/bGow3drFe6QII7qbyRIt0H2ttJHGB/drZrN8RQy3Hh+9hgiaWVojtRerH0FR/8ACQH/AKA2q/8AgMP8ayNa8eNo91Zxf8I5q9z9pLDbHB84xjovfr7U61urCe41rVr3S3CxiFjFdQKJVGzpg9Pzq4l14dfUjZCzslPADtEgDOWK7QMcnIPtTdQutFsLq2tn0iFmnn8o/uEG35WbPTn7v61aiXQJLNbtrWyhifO1pokXIzjP0qvpNxoOrW8DpYWaSyw+cYhCrbFzjk4x1/rVCLW9AY6asum2kb6iXKKIAx2KCQwwvzZGOB03Vp6TFbR+IdQNrAsMb2tswVY9nUydRgc/WtuiiimmSNZFjMih2GQpPJH0rnWSzj1bxBe3dlFci3SJyGjVm2iPJxmo4dV0CRpmfSoI4YSqmQW6vljtwAFB4+dfxq5qsmhaVGjSWenmR5UjEZVFPzOqk9O24GqusRaTPozXFja237u8hQSJCF+YTIDg45+oqzJbr4g1e4iufn06wcR+QfuzzYDEsO6qCoA6ZznoK0Z9Qs7K5tLCRgsl2xSGNV4OFJP0GAazZ7ZNA1GC7sl8qzu5lhurdeEV3OFkUdjuwDjrnPUVuGWMSCIyKJCMhM8kfSnUUUUVzem6lNpcdxazaRqbt9rncNFb7lZWkZgQc+hFXP8AhIv+oLq//gL/APXrK1zx7/Yv2Unw7q84uJCm1YMP0zkDnNXtFv8A+0tevLr7JdWu+zg/dXUexx80nUVlat4h1SC6vLSJJFBnZVkyBsUJGcA9uWJPXrW7aXE2qaQL4zPbP+8G2BwVO1mAOSOelVfD11cX8FvNcvffaktklKyFRDNvXqCoweR06j0qh/wkGpXHiUwQQxwrJFJBCZZi0RdZMbyABnowA74681qeJLhbUaTPIsjhL9ciKMux/dv0UZJqX/hJLT/nz1P/AMF83/xNH/CSWn/Pnqf/AIL5v/iaP+EktP8Anz1P/wAF83/xNZOsfEOw0a8tIZdL1WX7VuAKWjhhjH8LAE9e1NbzNej1tLSzcm7MKhbpTEYwY/vMGGePpmqUOlXdhqxaPTLn5LkNiKAMsgDsV+ctwMMD07Yq7qek6lea3+7tmCwxedav5jGNZckfvGJycrxgDgMatw6fLc6PDbXFlcJGknm3SzFWklZW3bVwcYLAenA96j8NaXf2Wmw2s1si2V3b750ZtksMhHIwOoP1yDms2PwxqEsOjMxEE8UJjVxGSbMBDt79d2D78DoK1o9Jj1DxDdjUXeSaK0twXglkhVjmTJwrfzzV3/hF9L9Lz/wOm/8Ai6P+EX0v0vP/AAOm/wDi6P8AhF9L9Lz/AMDpv/i6P+EX0v0vP/A6b/4usrVvhxoesXdrPcSXyi13bUW7c5Jx/ESSOnbFPt9LZD4h0vT8ZeKKFDcSs2A0eMljknGc1TTQ9aiuXlWNZvs12JtjNsW6UJHhVJJIwyg5PdQO5q74g0mbU3jmlsmlLyRQpGmD5cZkVpHY+4XHHp71JqUd/D4da3v/ACWMN1bpFLEf9agmTBK4+U+oGRVzSXFtq+qafJxI032qL/bjcAEj6MCD+HrUF/oN9Pr1nqEOofu47oSyRvEpKoI2XAPXq3T/AGial8S7LuK00gZMl5cRkqpIKxowd2yOnAAz6sKo6X8P9H0fxGdcs5LzzyjIUluGkU59zz+ZIrat9Hs7a7e6i8/zHzndcSMvPX5S2B+VXcClooooo7571htqFlZeLLz7XeQW++zg2+bIE3fNJ0zWfdWPhych49ftkmLs8kklxHL5u4AEMGOOgGMY6VesLrRrHT5LQ+ILOUSFufOiQICMYVVwAB6VLa6hodppcOnprdpshhWIOLpA2AMZznrVGWDwzPPKZtYs3tntlt0txcIqxgNuyCDnOcHOeMVLf6hp01xottaajBcul8vCziRyBG/J5yfrXRUUUm0bt2BuxjOOay59HujqNxeWerS2v2jbvQQo4yowD8wz0pP7M1f/AKGGb/wFi/wo/szV/wDoYZv/AAFi/wAKP7M1f/oYZv8AwFi/wo/szV/+hhm/8BYv8KP7M1f/AKGGb/wFi/wqXTtLls7u4uri/ku5rhUQs8aoFC5xgKP9o1o0UUUVkzaNc/2jcXtnqstqbkJ5iCFHGVGARuGelH9mav8A9DDN/wCAsX+FH9mav/0MM3/gLF/hUc+h312ixXeuTywiRJGT7PGu7awYDIGeoFXdS0qHUhGzPJBcQktDcQnDxk9cHuD3ByDVQWviNR5Y1WxZenmtZtv/ACD4zVjTtIjsZZLmSaS7vJgBJczY3EDooA4VfYfrWhRRRRRRRRUclvDKcyQxuR3ZQab9jtf+faH/AL9ij7Ha/wDPtD/37FH2O1/59Yf+/YqOaHT7dQ80VvGpIUM6qBk9BTIZ9L+0NHE1ss0bhCBtDBiMgD8OeKe+pWcdtLctOPKhkMcjAE7WBwR+fFTLcQvb/aEkVoSu4OpyCPWiK4hntUuo3BhkQSK54BUjIPPtVM6/pQjST7dGRIQEVcljkZHyjnoc9OlWHv7OObyXuoVl/uFxu/Kltr21vC32adJtuCShyOenNT0UUUUUVWl1GygDmW6iUI4jfLD5WOAAfTqPzpzX1qvln7RGRLJ5SFWzl+fl478H8qRdQtHvJLMTr9oiGWjPBAwD+PBH51Gur6c8byC9h2oWDEuBtwcHP0xSvqthGYg93EvnJ5iEtwy5ABz0wSRj1zRDq1hcJLJFdRmOFtruThQfTJ4P4Ujavpyorm9gwwyuHByOnHr1FXKKKKKKKKKKKKgvI7uSDbZTxQS5+9JEZBj0xkfzqj9l8Qf9Bay/8AW/+OUfZfEH/QWsv/AFv/jlY+taZ44nu7NtK12xgVC3nlrYhSOMDaS2e/pV7VFuYtHtYtSvEkmedI5JIoxHGwPB3KxPGMn6gVh+HrvydWj+3TCIyFnKuqhpZGWLaOnX5xjHTGKztSjvVW58uC4Cs7zLbzZaSYlnZFAwSCTs4yD1JrXtit5b6Xb2DJcmWxuFLp8sYl3RhmIGOAS3bPanxW8tte6jZYtzLbaaEjO8srIGOGZM8H1HfHoawyHhimmSUkJb/a43Zzl3WJYyT687q6G6sb6fW7prU3MFqtiLd5ioUDG4kKSNzHBGCOhPU4xWn4X+2rpFsk4ja3+ywm3deGwUGVYex798+1bVFFUlh1IXxke8tza5OIRbkPjt827+lFvDqaXLtcXtvLCc7US3KsPTLbjn8qbbwaqiy/ab62lLIRHstim1vU/Mc/TisTwxp3jW0kzr2tWVzBk4iWDMgGeBv4/kazdTZpNTOyR5ES8IcSKjEYdFXccdi7bc/wB0elS3kwvPDunG1ee6lhzJNLC2ERvLP3iOMguvHU8+9Z2nOYtYuReyIHktZTC5THmS7WG1TtHKxqCcf3var4S9j0xZJPNjtAm4uW2x+X9lxzzjG/261X1OGR47IfKMWFvLGik5YoyMWb6BDgduT3p9qkr6TqtvH500k9kpRYlMjGSYuW4PABOOew71ehtdYttXtnSQNeLp7BYJyu3asiAqSo4Y5PI9hziuwooooooooooooooorN13/j0i/wCu6fzqpqX/ACGLL/r6P/oIrSm/5Ctp/uSf0qrp3/Hz/wBtLj/0MVEP+Q3qv/XrH/7PVYf8eC/9g8/zNdA/+qP+7SW//HvH/uD+VSUUUUUUVjWn+u1D/r7X+dO8N/8AIKf/AK7P/Oon/wCQVpv+8f8A0Bqsan/yLc3/AF7f0qG7/wCPyP8A68H/AJVY0z/j5k/694v/AGarn/L4P+uZ/mKmooooor//2Q=="></p><p>（1）图中①②③④分别为（ ）</p><p>A．蒸发、地表径流、跨流域调水、降水</p><p>B．降水、地表径流、蒸发、跨流域调水</p><p>C．跨流域调水、下渗、地下径流、蒸发</p><p>D．降水、蒸发、地表径流、跨流域调水</p>'
        }
    },
    methods: {
        onAnswerToggle () {
            this.answerVisible = !this.answerVisible
        }
    }
}
</script>

<style lang="less" scoped>
.question {
    margin-bottom: 20px;
    border: 1px solid #eee;
    &:hover {
        border-color: #409EFF;
    }
    .q-title {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        background-color: #eee;
        font-size: 14px;
        color: #666;
        span {
            margin-right: 40px;
        }
    }
    .q-container {
        min-height: 200px;
        padding: 15px;
    }
    .q-answer {
        padding: 0 20px;
        .answer, .analysis {
            padding: 10px;
            line-height: 1.8;
            span {
                font-weight: 600;
            }
        }
        .answer {
            border-top: 1px dotted #409EFF;
            border-bottom: 1px dotted #409EFF;
        }
    }
    .q-btns {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        border-top: 1px dotted #ddd;
        .btn-slot {
            float: right;
        }
    }
}

</style>
