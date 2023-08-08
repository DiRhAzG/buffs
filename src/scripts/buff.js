import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";
import * as moment from 'moment';

let imageData = [
    // Overload
    { id: 1, name: "overloadBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/UExURVqWGTBWDkBlCkp2DFmEDAAAAWRDB5ByNGheN2mTEqqLN46IWEhXW0BHTUxCN2RkXDM+NmNwbi8uMA8ODAAAAGxC8qMAAAAVdFJOU///////////////////////////ACvZfeoAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACASURBVChT5c7BEoIwDEXRoo0QoCro/3+r7yUNdgPjuOWu2pxJp+mw7sKubTbpYCE5C8u3UDMDUI8Gwcm1GkllHCeYqqkbSZGAzCo2JjMq5R5I29YeaC5PGjCMN5Vloa1miu82pvJiTlyk+ZN/m1OYtlbpu/ibbRRo9t7r5LZXSh8ujx8ERRrlEwAAAABJRU5ErkJggg==" },
    // Elder Overload
    { id: 2, name: "overloadBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAABPklEQVRIS2OMmib5n4FOgBFk2bKs54zE2ueal/5/96SZRKuHmQuyh2TLpjea/Z+17QPD+ZO3SLKQLMucE0P/nz5+l+HTjXO0t0wmMOX/p+vnaG+ZesmE/1/vXmZgYGRleLJuBm19JhuU/v/nm2cMzNx8DMxcPAxP1hKfUEiOM0mf+P/PtywE+0gmIOn/kw3ziPYdSZYppVT///X6GcOTjfPBFkj6xAEtXkQby8C+8Yn9z8jJxcDMwcXwct9Ghu9P79HOMuXUuv8MTAwMbw5vZfh47SzRFoEcSlIwgjTIRxf+//v9M8PnW5cZPl45STvLZCNy/v96/5bh3YldDGKOAQxPN8ylnWXSgUn/f758DsrMDJIekQwPl02gnWXEFtS41JEcZ5RYOGoZJaEH1zsajKPBiDcERkACoUoKIMIQACK+AQN7f9x/AAAAAElFTkSuQmCC" },
    // New Overload Buff Icon
    { id: 3, name: "overloadBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABCUExURVqWGTJZDj9eCT9vDk91CVmEDAAAAWRDB5ByNGheN2mTEqiMR4yIRUFWU0g9WEdESGRkXDMvO2Nwbi8vMA4NDQAAAHpHqtsAAAAWdFJOU////////////////////////////wAB0sDkAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAiUlEQVQoU+3O0Q7CIAyFYVZG1c6JTn3/V/WcduiWOE289r+CfikhfawTkdyvy5h1sCalKCs7v/UiNJ4K0j06KE6c5GYk02E4wsxCaXgRgBTkFphhvkYa0anWJ7rNa2c01gsN2Iw302miXd0M312Y6Y0FcZEWT/5sQc1saTO9Fmn3rf72vi+2VUoPA2QjKzWdN3oAAAAASUVORK5CYII=" },
    { id: 4, name: "animateDeadBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACiSURBVEhLY4yaJvmfgV6AXpaB7GGCsukCqGJZ54RFRIUOC5RGAbfO1P//85eZQcu8jhEqhAJqGif95+HjZ2BiZmJgYmRi+PH9B1QGP8BqWX/fHoaKqgCGx9d6wS6+e/8Tw4GLogxsbJwMTCwsQAsYGRiBGAz+/2eoKUvG6igMMJpAqAFGLaMKGLWMKmDUMqqAUcuoAkYtowoYvpbRsUXMwAAAAD8o94sPe5QAAAAASUVORK5CYII=" },
    { id: 5, name: "prayerRenewalBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABmUExURVqWGZzF44q63JLD5Ov4/+L0/o3D5d3y/oW63I610HOkxZvB3FmGqZO82prK6rXa9HeYtMnn+oa/4m6buJG10Ljc9PP7//3+/6fQ7Zi82YGfuWKXt5bJ6c3o+r3h+Hyy11N+mAAAAK721FgAAAAidFJOU////////////////////////////////////////////wAN0MNxAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAcklEQVQoU+2OSQ6AIBAEQUTc9333/580wkA0gBev1oE0XZnJoFcOG5rDDgTdEZd6EHVHmQ9R30nsO+9IF/D3Cbgwivn3gXBJmpFcFDe4C1PmFmUFleJyNW7ajvXDCJ2Ez03zwtZth0oBtxj5nZkPzgZCJ+c1TTik3u3qAAAAAElFTkSuQmCC" },
    { id: 6, name: "antifireBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQVSURBVEhL7ZbJbxt1GIaf2T322B4nsR3bWZo4bRKiVIRSugESlANVEagqUqWqKpdeuHDm1v4VHLgiBOLApVIFBSSEyoWtamlDmm5JE7fZHE+8jMfbDL84ov0HqhxQ39PMaOZ75vvm/V6NdPazTMAuqQv75dMnGDo02lCuQ28cQhJUmxpxWeNoIs1Un82wFMUS57Ik0ZQ6tMRr3q9u8U/V4UZthUduCyVoYZmw3UGjBZYuEQQB+y9mdmA/C9i2tmGNjjhQFPaKJ97LDPB6PEevpONJAWtejRJ1fEkWQJkeRaNfsdACibWOx7XNx3xXLOBILqGggyfqbbqQisKrlzIo0yejl2YvV5EVRAEI6xrH7DQXchO8mcixWve4Z5a4Hl3lSmGRYNij0VthWdvih7bD7NYaj5sVAQ1z1M6wL2LjtFoUWx6m7ovOoCY6HHo7irzdkSRAYgIEvsZbdpZPhiYYMS2+Kc5zcf4vHg2UGHtNZ6VdxWlLzAwYXDioceAllQdxj9v6Cp8Xb/K1uD+lhzif2seBSIayq3UnpYgmttWF9YShI1qeidqcz40JuMQXG3NcdR/QjngsbzR5cMchEtKotFVutuJIhsHHo3AonySZiLCmlfnJWWLJq5LVTU6nRpgMJSlWZdxml7UDqwv6RI/FucExVFXmy5V5rjcLJEyFfDqCqQTcmiuTSpgk0yGMhIXiy/RpHaYHwzRQGeixOZecZEi3+LteIqxpnMnuIRUK4/td1g5MRud0eoRxy+by2iJXxYeOGiqyFuHsh728M2NgxCPkcgnivf0ctsoMq0X8tIlj1DDUgHdboxwKJ7ndLPJV7TY/VheZjCU4JUzmd9RnsD0xhfGwTaFe41dnjXBEpuJpzEzF+WCmxbVbEfaP5hhPpzg05nAk9hB1UOGuFWV2VuNkOc+etkU54TI3+IRmT515f4OHdYeDsSRhsS5PYZN6P0PCEH/WVyh2HCxhmEhcYygvHGRUef9YnezLaTJSjYNKAdnUaCdsbt6VOLxkoS5ouPEWI8cXODFlYqs5ivUqv1WekNbCnMhknsGyZoiGGOyN0lZ3GzVfImWIpS4bdIQZjoyvoxWWCAo1Optt2lmFuQ3h4u/Fri2bbOYdcqeWGRitinGDKty31ZD4o1SiEfhMWOLif7C8GOFivULBc8WeyYR0RaRDiNWKycOmjVds0ntPGMRyaVkaCwWbpW/7iCxEUaddpj4q8srQJl5HETXCpESC9IVlfNqsiyBIC3c+hUV1neWWy2rDIxrRyWRjvHFMZmpcZnNRYfn3GPYwmCJG190Y96/EcG4F+Pkqe88sMZ3YwBfZdaecFOFgEo+1CQmYqdcpCpgw8452K4i3Od3OdksvYM9FL2DPRS9gz0X/X9gu/hHDv+Dyi7aPCGimAAAAAElFTkSuQmCC" },
    // New Antifire Buff Icon
    { id: 7, name: "antifireBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAO1SURBVEhL7VZNaFxVFP7ue29m3kyTSWIy06j50dqFVJimVdwoTaGClFLFjYvgxlQRt7ocUVDcuxLB+lMa6yKgxY2I2FqriKA2tmLbLEptom3MTxua+Xlv3r3X79yXqXEfZpUD5517zzvnfOeec+7jqYl377boEDmw80eHoZSCouLK0q/UciEpULez9DC3Bn12BZ4y8KjP8dE0yplQg1uqj9LnLnWDTfO3lLISWXlhjpakNpDIIONj4rcKJi5U4Gc8lOwiBrCMt1t7cCLaj+OtfTg22IWp5HGciPc7fdneRAmLKKB+J44kujGuUAomvP4yyPnQsYFuGgRZH1PROKaa49hhul3CwfAMbBDD337Z7UV/LNrnbEaMZnJL/wNpr4UCefyDizwrVfQOQoI1GIXbDNe7Me0MhR5RZbxqIngRMKvrmM4u46C+F8/dRddWHu+sPoo5nq6a/QWLXsmVT8Da5Hp29pMI4x8NcZvWOiUxkn1qfGZyHqdLvejyU5tX/u7BxSiLbltDjxfjtX4PO5qjSJaHwXbi+exZLPoDDlD4ock/0zJmwgBJQ5PNBt64186m4Bl3enGerSsMBhF2dQM3bJFdrcFoHyrDk7NKb8V7UdbLLrH26VKwfIBz1Zt3OAWwbj1TXXFSwDwlZbFOhkgw1hthIVLYblYxNn+QpQxh4lDywRB7OUrO29gBCTmw/MIo7mNZTl05hIwMCIdDN9PTfKzyyF0rI7zaDy+w8HMc8tDgwwdX0U1Zr9fxHqfUEECvDWCS5Xsjc8414PV4D4qmLhCO0mlkKopHl4xkGpOmdSzTOBQmeHagxklKEBTJveQ+jWJfgl1YwwetAywty0Tfl4JvsaS6cI1DIrF4+RiX99K2BCYFKyW3UY12MzvFu+Xj+qfaccB7dvhSEUd21vDNkysIyi349yRoDTbw022LvbOHGE+uvMKL/im8+UDsBqjm5TDtX3X6ajSGnqTxH5gM2IjcI65LMzno3/txspngcxUh0hZPfFeEV2b5Bi2iUOPHuRBjPx9m9mk1jg99iQV2cYSnff/+FaypLL72/nLvJK4DIa3L1ElYyimzk8trHL2ep85Ck/2SQsMY/HApi8rpp6gXH4XzB77AZ/MhNFMNiho9hUSircdM40pMoRSMCimhvBQjMfYLdM9ZFLIGJ1++hda2AN//kUflzNMugPCFZ77C+GPsDz+LbA88ggXbpHiMIt/O9bgOW6hTX33BaZezI7QFtim0BbYptAW2KdRRsA7+EQP/ApfzvoonfZ4eAAAAAElFTkSuQmCC" },
    { id: 8, name: "excaliburBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA5UExURcwAAFtjY0dOTk5VVlhgYFtkY1dfX1ZdXVlgYFphYS8yMzc8PFZfXywwMFliYldgYFpjYkBHRwAAAFzDBgAAAAATdFJOU////////////////////////wCyfdwIAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAWUlEQVQoU+3OOw6AMAwD0ED5tPwKvf9hIWAJoTgsrHhwLL0l8prixbGqPsqxoMWtOZtZ212XWY9LLOISSwOGtTRiWJvijGVsyRiap615w9LYX+78xvPBvIjsZtorRM0c3R8AAAAASUVORK5CYII=" },
    { id: 9, name: "ritualShardBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGISURBVEhL7ZZNTsJAGIbfdkp/aLGApUaN7vzZYGLi0gVnIN7CI3gMV9yBY7h0xymMpFr8QWhpnZlOkyIVuqhdGJ7ky3wdoE/m/doE6RGIURVVyZhHFn0lVCrjM7uiq7heS79/WyhyWZYxHN4v3bNwjN3uddzr3cSSJEHOlpwtmZfrHkFVDfHLZTaejIlqCoHTtnF+dgFFUcUnACFEdEC9biGChhf/A0HwhcHgrvjJmISVptbQti2Yho4wmHJBWimmacHt7NMuuf9PUcraGLWagh0riWQ2m8OfjHmfpW6Y6Dh7CMKQnupd7OaTK2MnIjT/BhWx2TDmQQDPe8XEf+LXjGbLheO4dFYEOk2AweL8jRUZE7F1t2mBCbMEQUhrxvvDg2O0bJvOMJGk3yVE4WseK7LR6IEfxaODzuN57EHXCDRNB3s6Gem6idwYo2iBOI4RLiKxk2AYDZycXtKoGpjPp2KXRqep8N8+eZxrxeyRFO2fUvilLoutrBS2slLYykrh/8oq/EcMfANNjWUzO8yjwAAAAABJRU5ErkJggg==" },
    { id: 10, name: "weaponPoisonBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARDSURBVEhL7Zbbb1RVFMZ/p3Ohnc5MZ4bpZTrS0kHq9Bal3AyhhpJQAsQHhUDCixKiiT7wgIkxEgwmGkKCyINawBhCvBDlBShFEUNF2ooCMwitioSoFGqnU3qZa6edme06B8NfQPpg+JKdnb3POd+3vrXW3jna5o98ihmCIXbhjX+wWCA2KWMKqlwazlkKJWH8MQyecj+rVixlQ9saPPPmGh8ODce4e+c2Xxz9klAoRH1Nlvgg5K15Cq0wnYXJaSicBSoHi3b5QBerdqPmlKBcRahiK6rcjppfipor+1V+tzpx/ISajA+o7GRE5TLRB2MqFVHJ2Ija+sIGZbegFvg1FfCimvyoOh+qzINyCOfjsqfrFOhRTqQhLY5s4s5fAq7i++uhOLy+/UWWLZ7H2FA/U4k75DNjqGzKmCfjd0gnhti3ZweBgI/huMIpHLorizBXOiVLHkgKlw5DLC/pSollfTMhI5eXdQZ8Xjdr21bxW7gHs9WOySqR6J9oJmMuMNuJ3L1FOjnKxvVtjEsZ9HIUyMgI53ACdJ1Cs67yn1i5Q3/ByuzKGvJFPiySZ01eWPhUnUQyKU7GKHbMxlLkJTOVITE2YDCazbOw26yMRKO0tiyjwKTJ8wJMFpktPgqdNYwmraTEqQ5DbCwFdfUNHDrYzro1q4nGNcOpx1eNp7KJ8spKdu9+h7d2vkl/3+8UWJ18+vlRtm17ifDlK1T4qigtcxvpT4qbIWmq1tbVBl9gXgMZ4dJhGCwS28nxe3R1nKYl4OJWYwPdP/WhTSfE1TivvLafULgfJbHF4jnWxpMc/Pgw167f5PSZEAfeK6Q2WEU2qxhOKZ4MBlniLebSqU6ikRGm0Qwxw1mlUyN5b4C97e10nr/K9uc20Ty/lj8HbpDJzeZCb5h4MiMpkk4yZZhTUYHTZpd1nsHIPX4I/Y27tJpoTFq8rpYdWzZzLtzH2+0HGJfzMK2XWGCIjUo0Zk0RLM1ytvd7jnSdobGxiVw6g81mpuPEV7hcDtavX8fKlhY6O4+x9eVXaW5eRPCJADslvYN9p5hTVsa2TRs51tXNye7zFBXnKCnOU196/94wxAazUlA5eFkR9Ho0Or/rpvdSj0QOodP7WL6knls3+nh/z7tcD//Ih5+cxGTO882po1y5eI7YcD+79x7G73Ly2fkzHL/4Ld4KDbdNUerW0IRbh6lpnWNX/GqCrLT6lBTS6dCYymmMp8zibg09F7oZ/auDvFTsZt81bt+NUCMprq12MBG5yK+Xu/jgwBFiuSCNy5/h67Nn8ZdP47ELj97/gnRSzu8Kx32xaG+CnLTrxATITYC9xEfz020sXhDAuzLA8a4hbv58meZFdQTrGli6sB7pcsK/XGL/oR6Kapbx7JbnyafSmC0OxkZHJGVJCm1iQM6ebuSxVjlfM3URP7iuZgqPxB4KHok9FDwSeyj4/4rN4B8x/AtJ7MtF/0yh6AAAAABJRU5ErkJggg==" },
    // New Weapon Poison Buff Icon
    { id: 11, name: "weaponPoisonBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPASURBVEhL7ZZbbBVVFIa/uZ1L29OLLWIhlGANARNKsRgV2qqYNlB4IEZjwFuCxsgDNkgivPDggzceSNRYEy8kRmKI9l0SQZHUtsRarfShGGPRquVSWtpDey4ze8a1ZzikND42fep/smbtvWfN/++19prJMXZ3VAcsEEKxXz9ZgWEYGLKQrx7BtM3ILAPzj2VRpCAICvvSXkfLVZ6bjTDiZpyO1yPt614UXr1YENJeeT6Nny1l86dL8FVwiyx8MFBk3Smm8+Oh1/PCBsK4WTzhePZcEIlpu3nTFzGVC/DyfjjWZL7vcSN/jceaV3L8rb10HtlP59F2nt5ZF67r+zpuNs/csUYodoUhxqwhxuMXUK6IZRUqIyIill8+QrDqMiVr8+zZ3kZ5+RLKqpZSesed7GrbxsmOg8y410VQCVOUpYYWKfjCOBTTpI9+XkPzseU0flyNl/XFFBuPVnLfkQrWv1mGkpI6iSR2PE4sFiMRS5BIJilOVXDyw1dxvQyB799WtoIv4JaYl1Fi2muTMs4Z6xjTMrHEHMvCchCTuTSSEyvC9bNhdrolCudYwO2ZKZ9Tuy/y7XN/cmbP30IeCfe2X+bHA1f46aCci4j5nifBQmTo8xHvKf4aHiEzPS3LSsSiM9b4v+xCsZpUPSuK61gWWxdlKWVU2ejMjH9LeSBeyzvbn2eg/xfSExPkslkmxycY/Pk8jh3wwbFOTF+oRCjQm9E+KAhH4hq2vugbvgTlvBuhgO5GHaRcyUBIfrt0ldff/xLXdSlPFdHxxn72HX6XyfQ0iUSckso4hjIJbF+ei7j0L+dNE7dL5pRRal1a4dCyuVUawafnwD+ce21U3jnpSjz2PrWVmGVj2xYN61bzyuH3eLB+DY7jyJrNoZefQBnS/iKiS6mUR3GZSWvj1pBXzzXCzFyVY3XNRoZPf8EjqSrO5xI4fhI/45H3ZzjxTTftL+wg6cSYuJ6mq2+Q+ntX0tZyP17g8tWpXgLZpGe6BF6AS5YN6SwXTx9nbdOTnL16JhQLP1cDH91Fzk9TmZ6i3FJUVSTpmXHY1NAkXZbjh66z4AQ01q7kmZ0tYfYlqSRff9fDia5+DNfkocYmYkaS7v7vaS7yGJ2YYYwYk0XFxM0U61+6FJXRNC0cihgrKWMqb2DVbmGb7GhDw8P09vVI5xkcenYHUxmXwQvDZHM5BgZ/Z2h4lLf37QoP41xfN6vuWUPrpsfx797CNWUzmUyFvJo/xEJ99bVOmNlCYVFsXrAoNi9YFJsXLKjYAv4jhv8A6KDnh8Bya54AAAAASUVORK5CYII=" },
    { id: 12, name: "aggressionBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFxSURBVEhL7ZY9S8NAGMf/d0kUWmldHBx8w1nUxcUPYBHE3cnZLyCiq34EP4LfwsnBd6wuQkEHhbboUIXW5JJ78ZIe4iK5k9Cpv/CQu+dJ+PFcwiVk63hSYUBkspOdFjHzPzncXVERE+j2Elw8RDi/bOTe85vUQ804l9mpCuZnqpibrmB1uWSybljLlFLgQoBzASGkybphLUsFnKdCIBITJuuGlWz/4Eg9dWposw28szXIYMFU3LCSUUr7y8g5kiQGY8xU3LCTEQrf9+F5HgglekkTU3HDSqb0QamXdZie0/l/sJJl3UiuQ0Dq0Jl+wRErmdCv/E9ImXVYq206t2cnizlkwhGHTI9jBP4IxsplU7XHSjaeeCgzglKkUFEBqmQU1cB9F8mV7S1tq7DehHz5RHj1ivimieSuDfLYMVfYkyv7qrfwcfaMzmkDXS3rXb8ivNXC+zesY9HtuQ3qE+O06xfBUFYIQ1khDGWFMMA/YuAbp42cxpumWUMAAAAASUVORK5CYII=" },
    { id: 13, name: "kalgerBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJHSURBVEhL7ZY9aFNRFMf/530lz9hiISBKNgUrguAiTkIGBwe7K37srg4Wp1D8yCS4uDgpUlexlIIOGRwUh9JijEELOgS/qM1QpI15713/9yZaY997CRI65Qcn97yb887/nnNPIHLu7j6FHcKIzV7+LN1nw5UDh5Rr2xBYiBBCIqAdKCg6EX1wL4wUIhE4jNNYlmC91cLqj008bn7pyafROlbX78EWGxnHQ9Z14LsZZDwXOd/DmO9jfJeP3VxzmSxyngffcRnr8B0LHoWdbTJbxIq1gjaCMABr4Ykt2Exi253VdWi2Q9Mr9/l9Jwlj+ekYP55YsTsf38vGz4CtY9tC3Td9XDF+SFPdW2YjEanQCCpuavPYjSRixTS3P9RFMUnEisw18X6EPixKhCGFKBbS9Jd8yNouk1mYW/umo2NJFLs2eURZe8Yx83pRTHJORseEg9KJubVSkzLtxruqmGI9DgsPlUSi2M36G7n+4rl5c6a2bFadRzuiq9Qb/xC1WebvHseQKLYNPQz5PEq1JRFOJ4evh1DfXxCkipn577qplIqn+sYVJ/KJMYm/szhKlWdxnfvD9JkpVWmupsYMJDZdPG1OfB4FdcEqxJ6+PPdETkweTq0+VezqyaJ5uVxZkEtOQT1EQ7ITwEX6Z/0t0amjx4z/sv72/yurrjW7HnA/aJhE97435AH9RxudZ81myrj/TarYfHVJDu4tqONj+1Pb83R5cSC1vne28rUhr9Y/DXb0Pgw0IMNiJDYURmJDYSQ2FHbwHzHwCzNEyTlL6OhZAAAAAElFTkSuQmCC" },
    { id: 14, name: "grimBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAC5klEQVRIS+2V204TURiF13QOLW3pYcRWjlXkjEgIGGuCxxhCvObKRzDxJXwHfQQvvfDKC2JUEhECShCJCJRyKodC6Uynh+lM53fDhYYgMBD0RibZmWRn7//Lv9bae3OPX1QS/tHH7cJePlnj7PJu9feTXjTx+e2g7T27tXc5J4bdHxigTFoB1CTGRidsA08Ma26uJZc/AK/vArLzU5hY2Pp7sEiFSItbBtfRUEUCmSDTxMRiyhbwRJ21VPtIy6p49vQetJyBrGLg9YcVGGYRY7HjO7QN66oPkWUVQQ4RkuSEKPCItsjs78B0XMXqZhpel4ih6cShXR4J62kJk1wTxo8VHfHvM3tF+roj5HA60R65CIkB05kC1jczSOxkILH5tCiDFwRMDA8fgB4J624KU0FugINtU3Z24BU5yCUFgqcMKAuiUQYkB/D81Sh3o62aNM2AKxxBud+PnJbB2KeRfcBDYa0NYUpuKqhtaoUUCGNk8A1392YH5a9cR2w8Bp63UOMz0RkmSDyP6cUUNje2keck+MLV4C0D5VoCQ3O/w3MojHdw1FjpgyhJIItg8RI0IYCVooDLDx9BXU7AGH+PaJ2EkOxGLKlCKFlQszq+LKxz13q6qLKrDZPvPmJjdmGvwyNlbK8JkCQJcLplkNuP9aoO5IQQzI5mlH0bR8PiEJwFjXnEIZVn4SnqyBVMzOcs+FhwQkEPpmaWfkl5KKyzTiaRGd1UfwlbGQPuoBvx+l5MTucRTM7CZGG4asZRZmWh502IzE8tV8TXpS2OeUZiLoOUYR3v2Z0HtwnbSyC9BNHrgVUqsWEi1NeL5JyCGspgquABrc6gnHSk1BwcZKHErnMlW8RaOvvH+B/orDsaJZfHi/XYPCrEEtx+Nzh2aIsMrGhZuF0uBHwsjQ4Dy2sqZJ8XKpvXzRL0AiG+rZzunNl9Beyus32D2C141Lpz2FmoeLqX+rTkc89Oq9y+ff+BjGeik40iPwHQBcADuVp9pwAAAABJRU5ErkJggg==" },
    { id: 15, name: "vulnBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABrUlEQVQ4T2M8w8Dwn4GKgBFkoAkDAyM1zASZRT8DJ0w59v/4/j0MD29eY/j57QXDH77/DNx/JBnk1bUYwjMjGIJc1DB8heHC89ef/zfUlCTJ++dv//hvqMoB1oNiIMgwPnY+BmUlbpIM/PT+z/+7b/4wgAzFcOG9+9/+KylykWQgsh6skXLg2OX/1uZa8Ej//PEzw8dP3xg+fGdkUJYQZeDkQ9i3/+ARBjcne7gAhoFVuSv+t02OIMmFZcnT/3fNzcQMwxUrb4ITeES4OkkGglKDhKgwWB+GC0GSBTlWcAPj0tr/c7/4yfCOlQkeBCvX1qFYiKwHw8Cbtz7+lxTlZnjz4RfDo+d3GRYtPsQwb3o2hotB4SwvJcwgzC/GwCfIgjsMG9s3/q+v9Ecx4Pffv/9BEcPLzwt25cf3HxlERITgapIyp/2fNz0LMwxB6Wn+nD0M+aUeJIXhxO4d/119TBm0NIUJhyExBQYoMmERiTUdEpv99hw6/19ZTpxBUUEKdxiiuwiUCxgZPzDIyIqDpZ48fsnAz8fFICQkgDVY6Ft8ERN+6GrgLiRHMy49AJTC5vEf1NJpAAAAAElFTkSuQmCC" },
    { id: 16, name: "smokeCloudBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAISSURBVDhPrZXdSxRRGId/Z3Z2Z52ZnLVFosI13cp0CZHcclu2hD6goD/Di0UIwQvxIgSvuukfELoIuu4mUi90sbViyVWkUsLooi8lZEtd98vdM6cz27hgM5ta+8DhnBne8/Ce877DkCTAUEtqKTRcgrmuGYcSPnj0mN0fe8jCvdernko05wpPxydYd1cnQAgSb5fx4esqJMkJhyCU72Z+dhYbqdTvYBssGd65fYt8+bYGQSAIBs7Bd6wRlOrQdR2fVlbwbn7BjLTH9siJuQWkUj8hig4EO9qgut1Ib27h9UwctFQyo+yxFd6N9pHP/KjZTBaqLCN0vh0fl5bxY30djGdqjGrYCoPhCJuOxbC69h0lnlFuO4eWplPovXETZ862weP1mpFWyo3dzWfzuUwwfIUR6OiPRhHoCGB8chqyqqCuzs2L40ChkMcGv4KR4cE9+wxXFWGEFfI5aJqG0KUI4s9fQFZktPhb0exrgtagQVVVpLfSGOjvq+ytKrzQc5kVizt8JSCzmYHokiDx0eBthMdzlHcAIMsS/KdbMXpvaH9h18UeRilFdjsPWqS82k4o9RoWk/E9cX9iuGyLwt+jtMN7jzIcqffgpM+/r2wXizB09Vq5K3Sd4PiJZrxZfEVmpp4cSGZgERL+yblEBe+XkuRl/NmBRbtYhC6ngrlE7NCiCsZFmsv/5i9F+Xdq/AsAfgEAD7xI0n17IwAAAABJRU5ErkJggg==" },
];

let imageBuffers = [];

export async function loadBuffImages() {
    imageBuffers = [];

    // Top left corner of Buff box
    for (let i = 0; i < imageData.length; i++) {
        let imgBuffer = await ImageDetect.imageDataFromBase64(imageData[i].imgData);

        imageBuffers.push({ id: imageData[i].id, name: imageData[i].name, imgBuffer: imgBuffer });
    }
};

export function getBuff(img, buffName) {
    try {
        // Get starting pixel for Buff image, to be used to grab the buff
        let foundBuff = imageBuffers.filter(b => b.name == buffName);
        let buffPosition;

        for (let fb = 0; fb < foundBuff.length; fb++) {
            buffPosition = ImageReader.getPosition(img, foundBuff[fb].imgBuffer, 0, 0, 27, 27);
 
             if (buffPosition != undefined) {
                 break;
             }
         }

        if (buffPosition != undefined) {
            let buffer = img.toData(buffPosition.x, buffPosition.y, buffPosition.w, buffPosition.h);

            // ImageReader.outputImage(buffer);
            let buff = ImageReader.readNumbers(buffer, buffName);
            
            if (buff == undefined || buff == "") {
                return undefined;
            } else {
                return Number(buff);
            }
        }
        
        // throw 'Buff not found.'
    }
    catch (ex) {
        console.log(ex);
        return undefined;
    }
};

/* Get the buff timers */
export function checkBuff(img, selectedBuffs, buffTimers) {

    for (let b = 0; b < selectedBuffs.length; b++) {
        let buffTime = getBuff(img, selectedBuffs[b]);
        
        setBuffTime(selectedBuffs[b], buffTime, buffTimers);
    }

    // if (localStorage.debug == "true") {
    //     console.log(buffTimers);
    // }
};

export function setBuffTime(selectedBuff, buffTime, buffTimers) {
    let expireTime = buffTime != undefined? moment.utc(new Date()).add(buffTime, 's') : undefined;
     
    let foundBuff = buffTimers.find(bt => bt.name === selectedBuff);
    
    if (!foundBuff) {
        // Buff timer doesn't exist, so add it.
        buffTimers.push({ name: selectedBuff, expireTime: expireTime, buffTime: buffTime})
    } else if (foundBuff.expireTime != undefined) {
        // Buff time does exist

        if (expireTime != undefined) {
            if (
                buffTime < 60 || // Time is less than a minute, most accurate
                (foundBuff.buffTime - buffTime) == 60 || // Minute just changed, more accurate
                (foundBuff.buffTime < buffTime && selectedBuff != "vulnBuff" && selectedBuff != "smokeCloudBuff") || // New time is higher, buff could've been renewed
                foundBuff.expireTime < moment.utc(new Date()) || // Time has expired, but there's still a buff on screen
                // foundBuff.buffTime == 720 || // Fuzzy logic for Animate Dead. Overwrite it if an actual value is found
                (selectedBuff == "grimBuff" || selectedBuff == "excaliburBuff" || selectedBuff == "ritualShardBuff") // Want to just keep tracking if these are found or not
            ) {
                // console.log(`${moment.utc(new Date()).toString()} - ${selectedBuff}: ${buffTime}`);

                foundBuff.buffTime = buffTime;
                foundBuff.expireTime = expireTime;
            }
        }
    } else {
        // No expire time set yet, so use the new time.
        foundBuff.expireTime = expireTime;
    }

    if (localStorage.debug == "true") {
        console.log(`${selectedBuff}: ${buffTime}`);
    }
}