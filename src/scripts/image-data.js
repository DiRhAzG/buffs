let numberImages = {
    100: [
        { id: 1, name: "buffNumbers", imgData: "iVBORw0KGgoAAAANSUhEUgAAAEgAAAAJCAMAAACmN5q8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURf///wAAAAAAAH5RqV0AAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC2SURBVChTbZEBEsMgEAKj/3902eVM20xiigjcGe21d96BfV3MhSPUDg7/xT5NOKIvF2uxDGyFYB6NSDHXN4PiEw4y3XXULARf7CIGXq38inh3ZqRbJdsCdpxzrB7EEFJsVz3NWyP3nqMpeQJKmTADZ4vMDkv/G7VPhXOdmgbMAJJsdIYxxwnZx88xGFnOkv115ZY+GrVP76Kf4SUQVIIjT0G55NlI2X8ZZJZXH14ZNlwyIz32/gAfMgM+QtgzCwAAAABJRU5ErkJggg==" },
        { id: 2, name: "barNumbers", imgData: "iVBORw0KGgoAAAANSUhEUgAAAEgAAAAICAYAAABatbkrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ8SURBVEhLnVbNbtNAEI7yZwfuwIukVcU1kWLCCxB4AxAHUKXSlnt5hgYJxC3lUn5uOD+201uc2gnHJHa4x+4TLDvr9WbXu44Cn2RldnZmdjzjbzYFHkEQIioy+LO5pAN4/kzSO84Y2Y6jtE9hOTdkP47jnXYzfK5l24KNZTvIxg/ICIMoMSAXiBuEa8Hen//OPSNci7bu9FZYT2892ddoP0VXV18lQ+NJW3nQZbeLXr56Le0tl0ulPcA0+2RvPL5BxWIx1w5QrWpIr91jNppeQzp+IB+zn8SJ4zvyW8G2necvWP5pASpVHZ2dv0eX3Y8sDiBboFUQCGuGbNX5zgD6gyFqtQy1cw583NGDg0OlT78/2CtWVdP2sgvXf1C9Xme2nz5/YXKpVGZyFEU74/EFWq24YkFBypXKTuf/Af+CFqYeFQvDkcVk0zQRFJMuCSCfc9zxkWUhz/OVeYWZpk4mE3T97YegiyKRwhCXikpAUVJQVQKq2OkM1KOihKqmS3uu60o6rXaf6PgCpfThuwv5NBoNsm632yiPruWy2NRnnQ5y3amgWywWeCYmM4++J0F8l9CSx4qbv71eb7tPObx1VgxPAydKxb1xenpGfCAe0BQeGPiRIv7I2g7jbD78iwGy+WUvi81mI6xLuJBHR4/J+VRVuP7+U5p/PK3cqVjoQrPZFBUc4HZoGf9eoDdvj5lPmgwM11+YVkTJIUuZk5N3bG1z9EzBvxzcvA8ePmJrVQP2Af8FAYRCw6cJn77qWoSOTTjKQEehG4PhSLCdz5O/A3A9E0UOUoqls8efyX8XTDzIhzg+P7sAebFTGlq2XEzPF33yCqi61i8uPqC/Q0njy/uQJBYAAAAASUVORK5CYII=" },
        { id: 3, name: "familiarNumbers", imgData: "iVBORw0KGgoAAAANSUhEUgAAAE0AAAAKCAMAAADGiiNWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADYUExURfDx8f///660t+/x8cHGyNHU1tDU1u/w8ZmZmd3e3u7u7ru7u6qqqs/T1cDFx+7v787R07C0tr/CxJmamnuBhO/v8ODj5N7g4a+0tsHFx97e3+/w8KusrN/i477Cxc3Oz7G3urC2uNDU1a+ztd7h4ru8vL2/wL7Ex7y9vszNzczMzMDExtDT1c7Pz46Wm5yhpNDT1L/Cw93d3c7S1MHGyYiJicLHysDFxt7e3rK4u8HFyMDFyL7Dxr7CxIyPkODi5KyvsLC1t7y+v6yxs5+lqL/ExnuAgwAAAFbhL24AAABIdFJOU///////////////////////////////////////////////////////////////////////////////////////////////AJzs8mAAAAAJcEhZcwAADsIAAA7CARUoSoAAAAE5SURBVDhPdVIHUgMxEPPmCIFcQugtQOi9Hr139P8fIa3tg2GGnbGkbT57zwEIRgBMkMlkrhiQbrguGPQUc0NmTc/bsOdUHhy5Wt5MGBmVANqR1B8VN0uMsoPuGLkXYyRgnMuPRev+9EQxMelU0M2ZukLKHUv9U0BjmhyiO/OrNopZx5bcOZfAfGJggZ8vyflLi6krRJcYRTbrLxGXpTSpFYow6JmtetLB1tY30tkY2BT/txuwtY0dscfLXYo9in15B4JD4Ig5jbcwHJ8olm7qN/pj+fd5glAX5ACNe7Xt9KzCubvh4lLEkdfF2VIgEvGq4wq4FtRh2k0W9QuJfgzi9g6456hlHnp4lHoCnuuaiktzBZp8d8prNx61z5J4pUR4MXv1vJrfzN5dVmYfPjA3Ux+RU8LnFwH4Bvvyo5PQvzEEAAAAAElFTkSuQmCC" },
    ]
};

export function getNumberImages() {
    return numberImages[localStorage.interfaceScalingDropdown];
};

let barImages = {
    100: [
        { id: 1, name: "lowHealthBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAFoAAAAUCAYAAAAN+ioeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQKSURBVFhH7ZjfT1tVHMC/5572tkBWSjcazSi74I84y4AZkzm3LJlLjKiB4rOa4gNL9sbbEqOOGE18mj6Z8CD1HxBGVHQLWVyChgcVcagPSO+g2wysXYFRbnt/HL/n3NuuHW2Dr3I/yUnv+d7vPQ+fe/q95xwCNTh5ri++s353gG5v9mJXsaOgmk2B+YbWx6/8NDOdcGIue2CX6OOnz8Zyqb8v+01LoRIB2esBrySJe7plQUE3QLMAGGOq/8hTI7/OXp8UN13qUiH6xa6j490NubiPEkjlGKxmLfD6ZaCOaBNF61oBIkEJIo0EChaD38zGxOzPfw6JBJealESP9T87/k6HL46TuMRcmsHHCxlY27JFhw9YcPFYCE4eepiEruGLZD4xPPWHK7sOwlhi8Fjs7VZrQkQ2dfEjCHghj2XipetpaMHUibMhLCMYfySH8+W6NDg08btbRmogRFvD0STKK37wgG3oQJptgZzlOxpsdYagR8s5ETuHU8oLeFVpbLHD7rg8Ck28Go33BCDOpy6Xl922xMdO27HAr+MFxkOtPnjM0G252C/lYOM5xE8BfDTYFA7fura0Pu+M7VKG5DO0AV4KhGTDDuby9gXv83Y/rYtW7HPKc8QLwDHazPyACLrsQlLzJl8nPySriR8usl4TOLlFVM2oHMulhDSdzCm4cBAEPc7Ff6D4DB/jOzVXqvMulUj3DAqf3S1UfPwadwwwtvS6jee0EFPk82c/xTHSOJZLdUi0PZKkhYLywREKsZBPBLP3NNg0ivO8OgEPgeAhv7iezORh9JYJpiyriyurNVceb178qP6g/2NId7R7wr+RjvHt9aUIgddRNklvw31Ga8rmkvlsZgeb4GuUfGmViW261nxwcmFxYdBJ20X0hdMsu/aP09tfkBNnzsXNlaVxyTDAIij7MEBfi7+m7HLJ32Y0GL2D9YdJYHk8QNufHJq7MeMeNlVBbFhOdHYkZdNU+FlGnhnwIcp+heEiGSmXXZTMmSYSvH8bl88EBeNsLlCqzi0n3Q1LDcQhhtT5zAg/s5BQmIzi3l214CqK5HCxXHC55O/x3iiWCy6ZPyOexTHETZeqiGVCannpr/auHkV+sNnL5y5FkTO4E1GCEjzBGDQQu3Gu4b338EV4qH2qx8MsoiR+/GHmE5HgUpWyszqAU6fOjMNKMk4kAhrWbIJlZCxMoUe2Z/J8gcL5NdyqEwp+rMmMT+X2jsTs7I09ndw9ffx5tr2RdXr7iwrRnL7+N2KZm79cJnld4Xo9HhM+b5PFhuRCqgAGrpX534D5vGqo67mR6amv9nxi1/fWsP232IfsEl3k5df641u3UwM7mbXeZstUeOYGoWpDKDx/4HDblavfTLmriz0D8C9CWtsBi6eacwAAAABJRU5ErkJggg==" },
        // Poisoned, not implemented yet
        { id: 2, name: "lowHealthBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAFoAAAAUCAYAAAAN+ioeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPhSURBVFhH7ZhbTBRXGID/mdnbLLvLgpsSEOOYEGpp0kAwdTUNVkWtGgP0tW1c+sA7b00fGtOGB+ODj8aHlo1JX4smVaCiiLdgExKaJt4g2YESEKS7C3tjd3Zm/P+5GPZGiK87X/Zk5pz55zx8HP75z2GgAl3nzoeyW2IPyy22c46EQGNyzi8q8t5Zp0u49fDO7bAWaLErSkQfPXW6V5KeXXX7NwR3DQZghIPTn+VkAFUFSKcAUrFa0ek8Mvjkr7Gb+lOLnSgQfaS7dfiTzkjIbgd4+0aGTFKBGh+AE4UTWRK8CcB7WGhu4SAVB3j9z/7wo9H5fj3CohLvRf94vX74wsVkiFawyforG9y4lgHepWqrWZYYOH+Rg487WCNCX+F/3vCEhwailuwd0LT+9Fug99w3myMbUW2sADkP8OslCRQFYOAXO7BGGtlObT3And99fT9/v26lkQpoosdXHBG8CFzSDuvpHA1pBNwO7Rr5T9IChX2YU5DiGNkj0a14pjF3QBu0KIEbvNIUavksHYqtqZCWZEjHGZC2GLC78KNHfWxON34QsZl9woyTOBm2MHfzNYw/0NCwMH03MasFWBTAKr54D0kmSJ4J3e/UTMx7mkOtjfdoHYsS2LXFfDvdkLA4VhQf0kzZ5lwWpbALM5KwmlUhwePX7gOhd2kOmssYsiiCzaGgmTFdciwvF7RUjC3biuOIqVEZaC6L8jCHT/ojYI8LbcdwE3JQTwGOBFYfslZJVCTA2SHn1WOWXqrwYkoBVfKKz+4lKlYe3/4wVLV/Caazq2XEu2e+N5cBaETZbSh7E3d828lgHiZ43CVux+cHeI6SV1Cyg8cU8n/LzZmH833G4xI+DX6hxtfeGL3qggme6A7Z+IlhDktmKtcau5j3sk3BxZBwkvzilQrLUyq4vLhzxBIvn+nun74/YR02lUHLFZ+f8EY89QmBepkEA01fMtDcwMByvPx/epOfgaVVXMkPdMmAv2TUK/59v3LaqHa0QwuXq2uQUgcJ41Hc4oQCS0ZtXQ6STDGmZHqX5jAeW5RBO7lYmJt72SwEBUVdaldxVTswjaz+iwZxVfOYe7cTjQGsoGRPLYCCIfksXrOHw4/HJy8bIRZl0MsMg6OngsMKOx2y2XCh4lpPotTASRbqMR8TUczbsUkFeJTMYEWYz9PWMhh+end6Vyd3rR2H1NRG0Ze2SigQTZzt+7p3PTF5lbHFBBZXLMn+6Cv9WHQN621PHa5gfEvN14kB7/HB0ZE/dn1id/a7AZyxOikRbYLCQ5up1z2ZLbE9p6a1HZ+DcYu8S5j11bTeQsFWdbFrAN4BZiTT8cU3b1gAAAAASUVORK5CYII=" },
        // Prayer off
        { id: 3, name: "lowPrayerBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAFoAAAATCAYAAAAQ/xqmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAASTSURBVFhH7ZlrbJNVGMf/77Vdu7Vvu2sHGwVl06yMAhM6AriBRIl4CxMRmDEuGX7bNDFq0JBFyTQmsn3SkPhBBwqIIUENQYkjIg6IQmFDwpDuAhttYaMb69b76zmHbg7sZN/3/pL27JzzPM+Hf/455zkdhxSs21htv+0drIvdgTMWjVVseXc79jbuhCiJx2Ur3OZMa/ORAy3dyXCNaSAkR8Zzr25TzBm5jQm/bp+cMLn0osluLbBh1aZN6HK3Qwjp7Hw4zRUeiNXnPVyglFWuOX35/B+hZLrG/zAh9PqtNYq340arUc1+3qA3I002sXXH4+XIf6QY0TujuOXxwqAzQRAkcBHJNej1PrV4zcr9nRfOaWI/AJ5+UZF9f/lajWKW06C3wKBXwPMSTPmZmLe4FCaVZ2N6noWt030aR+NpHs1n1TSmhDlaMdsa7zrZAr1shCjIiCOMouUL4VzyGCRTDBk6C0aCw7jV0weJ10HgRXAcSY8JeUNBr76v98pRVlEjJcLaDZvtuKnfp5fTiUvNgMohFBlBjsNGLsWXkJOph56XYUwTkTVrLnquX0agf4AILUMUJSQSUaghzlW8fMGXnkvtgWRdjfsQsrIKdujIxSdL6WSqIpoYRV7pLFTVbGMiU5R0noivwmgQYX/Uid5+IvaNm1BVusshTsQeCQ9Ac/XU8IkRzqkSxcbCw+AVHo61y7DhtVpkW3UsgIo8eaTrdJ/G0fhoZJQIroLWYQEaKeGcjifV3Dnz4FhWjocWO2GfbUeO9V8n309gJMFG/2AI3de7cfWsGx2n2+Dr8cDdcTRlX65BhP7k6xNqoaOUTWh3IWXEoIjGlCKPQ8UOxIKk5RMxzN0VvrfjAt7avFITegq4hQtWq7Y5xShZetfRc4mjs6fh6JvE0V1JR1880wZv91Xi6J+mFHrrOzvZiT4T2fPRdo4rW/R0q6waKuilZp6VixLXUqxe/yy5CNNY0GSxJ46NgTH88sNhXDx1BkN9PrKiIoTA8bPunytZQApKXCvUgN+bnM0s+jx/c9ySFU/s0gUt9ZJoIEvEdLyKgkVF2PJ63T3OnuzkvZ8349q5TiBBDcwhGhtF2Hi76c/fjr3BgjT+A29SzM2R6BjrhzmOJzqL8Jxqx57PdjHnUiY7ma7TfRpH42kezad1WJBGSoTuzksBW1Ghoo4JLp7jwPEC+fAY7OtHhIsjr3A+olIYw4EEjh0+hI7Wk+Shoicik/45HiEih5AwB5t+P/bj/mRNjRSwAzgn39YQE0bcVDQqnpqIQ40DHW0n4bnmYd1FFxnPnzzB1un+uMg0L78gv4FV05iSiS5h3cZqxX/F18pFZacspbFHSDgSxKoXq1C+oQpt3x3Er98ehE42MjfT40KVIu6c+bmVRw60PPDpXbSoTA0OzcwXOrsMk38znnn5FWXAP7Aj4uPq6TyeiMFamI/ajz/F7rffxGBvP/sxiSLnqk2ZOZkN33/z1bTUW1ddO2PbuyMtu+8VepwXqmvsQ75bdQH/qDMaDldUv/cBWj58H5JOd9w82+RWLErzoZYvtP+wTBvgH7U52Md6auvBAAAAAElFTkSuQmCC" },
        // Prayer on
        { id: 4, name: "lowPrayerBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAFkAAAATCAYAAAD7yKGlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAQjSURBVFhH7ZhfaFtVHMe/59zc3iS9SdrYpO2yhSVudV2ptNOwuhUHe4i6ocMJqw8T34SCMEoVZA+KgkPYtAjCXtUn0wfBSevYxkCpbFLBP3UUFdq0Xbus7ZKbNGlumuQe7zlLZ2dSrc+9n4fcnHO+v9/D9/7yO+eEYBNO9JwPqY5ixCDJ2OH+l/H9xS9Ambcvm5fHv7r55nRFZrEFqkzm5rbtUqdURwMIIdCUDA6+3ocfPomhoeAGYwzZvIY/5rJhy+ytIVWegtNHPxjcF3x0xOduhUttRalMoXY0ojEcQHFlFUqqHm61BU7ZCY/qPBP0Hcj+On3tRiXcYhMemMwNDrXuueBRg3C7fJCIAzlnBv6DQfhUN8p2itScBg9pgWJ3mxEOOBQpahn93wiTeYsI7mwfaXIFoDpbIFMXMoUUEC5jb2cbZFcJ9bIHy9o96HckqIr5EmwOUCKByY6oXz3w+e+3r2oio0UVlH/sag5Muev8IKZ5gBPJrAatKYHHj3TD16igwVYPn1cxx13INd8R61zH9TyOx/M8FrWhxyPnQzalBYQ2wCgSLK4sIOWbxlMnDwtjOQ2qeBdizOf5OtdxPY/j8TyPEFlUQevq5AgrUWi5JBLlOOj+NHpfMg02K5izbvADo815vs51S+y2iAMj4HmEwKIKyiQ9tuKcgSei47EXd+CJo11VFbzOxormuj0n/CIuY58FzyMWLaogH8d+Zi3t93/pbkbFJsd78D8N3oiWNaCVcuaxzoYMMcRcYnIaZ/q6Nr3cbGfIsUNnmT+8G8HOIAKd5jMQqGoVG+EGc5ZSBczOz2N+Io7ZiVksxeMYGTu3qcmn33qfVb5uO8izkXdPNTftjvHjmPQIwY5OL3qivfDXaBnrBi8mC7h5ZQwLE0mU7zEYrIy7y/G+y+PvDAtBDTp6epm2mKiMthfkSMfZUDCwb0qtd8MoMxRYGupeguOvnnyoojdW8MhnXyL7J4NCPKASQbZwF7MzM+Fvb52zrtk1oNyYfCmBQikDRtegSC6kftNx6dNhs2J1Ifq7gu/P83Wu43oel9fTsAzeHNELtEwinM2lsFY0N7NyDna7itRkBmPfXMeS2Rr4JscNHhu9bs6vwCbLQsf1PI7Hi2wWNRHX6qmFG9rO5o4sITRKJXOKGTAMhnR6Ge6QeauzN2Jmfg6/XB4HLSiwURtKxhpW9RRSmfk3rv340ajIZlGTh04Dz/QMDrqczRds1A7JZvbafBLt0f3ofj6Kn76+iskrt6A6vCiXmGmyziuYG/xhJfxfaet+kuXS2/PvjaojV/RQf6hO8k7Z7XUoFghsPgOn3h7A8HtDKC2Z52iFQdfXYJDV8Oh3Q1vuw8+98tr2PcJVnlUce3ogVCzmI0VDj70w0I9LQxchU3ufLDvG/4+5FsBfp5WsPuCZsY4AAAAASUVORK5CYII=" },
        { id: 5, name: "lowFamiliarBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAHAAAAAZCAYAAADpG6rZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL7SURBVGhD7ZlLbxJRGIbfMxdmgNJy6TW9GA2UxGqTWhf8gjZGf4Ju3enaP+B/0b0u3TTVjVaJiSZNG0Eol5bKpWVuwMzxG1KJSetSgXieZCBz5jCbJ+/3fScwXHC8tcX1lRU0K1Vce/1qsP6Ld3c2+a14FOrCArxuF+EXLy/tEfx7JP8ju7TELfoOTk9j4e4mrKdP+I/tbe4/86mkkjw1HYeUTEGKxeGenaGWXh08FwwP9nl9nduGgVQmAy8YhBKNIkAX6/XgfP0CO5+Ht7iESDoN1zTh0l5GCTQ/vIdVO0WyVhNJHCKsvLbGvbk5dElex7IgyTKCdK/F4wDnkBQFPVo3ajVYp6cIBAKYiMWgOw740RHie3tC4BCRjPNz9EhGs9FAu1KBeXiIdjYLu1gEOh247TYYCXSrVTi0ZpJIk0ooU1Wo4fDFawTDgr2NxfgEJc4IheCQRJXKZGJmhpKmAp4HyU8hpVKNRNBqtlC3bcRo/xzdKyR/amdHJHCISCUS0iiXESBJLqXK1HU0qc+1SiV0aL1LqXTosiiBIZLGqKTKJFa2TBi97sVrBMOin55Xssyjy8vQaAoFDS/nVCYnTQMRP4GMwZMkcJIXoGHGH3Q0GmJCRhuJvY8ifUOmf4x44LqsVSj0z3eJRAJxGlQCJE6ig4JfQmXao1LyVCqrMRpgNOqBB/WG/1PBkOkL9Lnveayxv09tz0N0agqT/pGChMmKCkXToFOP1DUdvcJ3VJoNZHI5kb4R4JKEN5OTPL2xAbXVhEe90EcKaFBiUZpWOzg5ruJ2oSjkjQhXivg0P8+vk0RGEylctz+4dGwLJ6UybhaFvFFiUEJ/x2k20Tg4gDI7C4UO9B71wUb1WMgbQa4UmLFt1q3X4eRyYBNhtOm8l8rnhbwR5EqBPqv1OpNpKoUehE0DjGA0+aNAn2zPhUNTaXJ3V6RPIPgb9JP18Nlz8d/emDIojYs3kkLimFH6diham0AgEAj+W8QQM8b4Q0xf4L1Hj4W8sQT4CdYSNlFiGr0iAAAAAElFTkSuQmCC" }
    ]
};

export function getBarImages() {
    return barImages[localStorage.interfaceScalingDropdown];
};

let buffImages = {
    100: [
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
        { id: 12, name: "aggressionBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAFvSURBVEhL7ZY9S8NAGMf/d0kUWmldHBx8w1ns5FewCOLeyVGcBRFddXVzcfdbOLn5gtVFEHSw0BYdqtCaXnIvXtLDQZDcldCpv/CQu3sOfjxPQnKkdjarMCJS2cVui5j5vxzvr6k+E+j2YpyeP2bu/0vioWacyeJcCcsLZSzNl7C3UxmqG9YypRS4EOBcQAhpVt2wliUCzhMh0BczZtUNK9nh0Yl66VTRZpv4YOuQwYrJuGElo5QO2sg54jgCY8xk3LCTEQrf9+F5HggluqWxybhhJVP6otRLK0zuyXwYrGRpNZLrEJA69Mog4YiVTOhX/jekTCusVrecy7OTRRwy5ohCpscRAn8CU8WiydpjJZuOPRQZQaGvUFIBymQS5aBgsvZkyg4q2yqsNyHfvhBeNxDdNhHft0GeOmaHPZmy73oLn1ev6Fw+o6tlvZsGwjstfHjHBlbdntuofjFOX/08GMtyYSzLhbEsF0Z4IgZ+AJv5m1tTCcypAAAAAElFTkSuQmCC" },
        { id: 13, name: "kalgerBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJHSURBVEhL7ZY9aFNRFMf/530lz9hiISBKNgUrguAiTkIGBwe7K37srg4Wp1D8yCS4uDgpUlexlIIOGRwUh9JijEELOgS/qM1QpI15713/9yZaY997CRI65Qcn97yb887/nnNPIHLu7j6FHcKIzV7+LN1nw5UDh5Rr2xBYiBBCIqAdKCg6EX1wL4wUIhE4jNNYlmC91cLqj008bn7pyafROlbX78EWGxnHQ9Z14LsZZDwXOd/DmO9jfJeP3VxzmSxyngffcRnr8B0LHoWdbTJbxIq1gjaCMABr4Ykt2Exi253VdWi2Q9Mr9/l9Jwlj+ekYP55YsTsf38vGz4CtY9tC3Td9XDF+SFPdW2YjEanQCCpuavPYjSRixTS3P9RFMUnEisw18X6EPixKhCGFKBbS9Jd8yNouk1mYW/umo2NJFLs2eURZe8Yx83pRTHJORseEg9KJubVSkzLtxruqmGI9DgsPlUSi2M36G7n+4rl5c6a2bFadRzuiq9Qb/xC1WebvHseQKLYNPQz5PEq1JRFOJ4evh1DfXxCkipn577qplIqn+sYVJ/KJMYm/szhKlWdxnfvD9JkpVWmupsYMJDZdPG1OfB4FdcEqxJ6+PPdETkweTq0+VezqyaJ5uVxZkEtOQT1EQ7ITwEX6Z/0t0amjx4z/sv72/yurrjW7HnA/aJhE97435AH9RxudZ81myrj/TarYfHVJDu4tqONj+1Pb83R5cSC1vne28rUhr9Y/DXb0Pgw0IMNiJDYURmJDYSQ2FHbwHzHwCzNEyTlL6OhZAAAAAElFTkSuQmCC" },
        // Grim
        { id: 14, name: "bookBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAC5klEQVRIS+2V204TURiF13QOLW3pYcRWjlXkjEgIGGuCxxhCvObKRzDxJXwHfQQvvfDKC2JUEhECShCJCJRyKodC6Uynh+lM53fDhYYgMBD0RibZmWRn7//Lv9bae3OPX1QS/tHH7cJePlnj7PJu9feTXjTx+e2g7T27tXc5J4bdHxigTFoB1CTGRidsA08Ma26uJZc/AK/vArLzU5hY2Pp7sEiFSItbBtfRUEUCmSDTxMRiyhbwRJ21VPtIy6p49vQetJyBrGLg9YcVGGYRY7HjO7QN66oPkWUVQQ4RkuSEKPCItsjs78B0XMXqZhpel4ih6cShXR4J62kJk1wTxo8VHfHvM3tF+roj5HA60R65CIkB05kC1jczSOxkILH5tCiDFwRMDA8fgB4J624KU0FugINtU3Z24BU5yCUFgqcMKAuiUQYkB/D81Sh3o62aNM2AKxxBud+PnJbB2KeRfcBDYa0NYUpuKqhtaoUUCGNk8A1392YH5a9cR2w8Bp63UOMz0RkmSDyP6cUUNje2keck+MLV4C0D5VoCQ3O/w3MojHdw1FjpgyhJIItg8RI0IYCVooDLDx9BXU7AGH+PaJ2EkOxGLKlCKFlQszq+LKxz13q6qLKrDZPvPmJjdmGvwyNlbK8JkCQJcLplkNuP9aoO5IQQzI5mlH0bR8PiEJwFjXnEIZVn4SnqyBVMzOcs+FhwQkEPpmaWfkl5KKyzTiaRGd1UfwlbGQPuoBvx+l5MTucRTM7CZGG4asZRZmWh502IzE8tV8TXpS2OeUZiLoOUYR3v2Z0HtwnbSyC9BNHrgVUqsWEi1NeL5JyCGspgquABrc6gnHSk1BwcZKHErnMlW8RaOvvH+B/orDsaJZfHi/XYPCrEEtx+Nzh2aIsMrGhZuF0uBHwsjQ4Dy2sqZJ8XKpvXzRL0AiG+rZzunNl9Beyus32D2C141Lpz2FmoeLqX+rTkc89Oq9y+ff+BjGeik40iPwHQBcADuVp9pwAAAABJRU5ErkJggg==" },
        // Jas
        { id: 15, name: "bookBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABvUExURVqWGQAAABwYADcwAA4MAHBgAI56AEQ6ABgUADUtACIeAHxqAHZlAId0AEtAAAEBAIZzAEM6AAcGAI15AFBFAGpbAEc9AA8NAIt3AD41AGlaAGFTADApAAwKAFNHAIJwADsyAI97ApR/C1hLAgAAACPpFbkAAAAldFJOU////////////////////////////////////////////////wA/z0JPAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAZElEQVQoU+3MNw6AMBBEUZuwGGOCCSZn7n9GtqBAYk1NwS/nScNeO2x91LjjYhy7hpt5PmABaQJCKSNFWpykmc4LTRmUFZi6aSnrQPSDoj/HajJmXkjjBtZtRyLs0W90aLYYOwGmtU//Jw/+JAAAAABJRU5ErkJggg==" },
        // Wen
        { id: 16, name: "bookBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEnSURBVEhL7ZYxTsMwFIb/Z8e0oahqYerStVInJCYWJhjZmDgCB+oROnEL7tCJraq6QqESbWKb58QVHVpipMgDyidZtmPHn/38FIUeJwOLWMSSOY/w7Sj8X1mRINOnJfn+QXrjBwtjeDZPc8UhWmXbZIDVxaO32fPRdcLvzLoc4rITOcwG0FwKwpYJlPHO90TUSwDl+nxam3PtTlad1GEyzaEiATlKcXo7RHLZAaV/v+6gN6ibQt10kbAsm79D9BOoqzM/ukP6+jhh21MS4kLxeoR88QE9W2P7svKDjJDQHNkqwmSG7ycr7+Tkrg857qB1fw5q82mILcaCMg51BUEy+2mQv3753g/q2oWyTJzNdl3Uv9J8G+ugkdVCI6uFRlYLUWUR/4iBbzl4S3Zv/Ll/AAAAAElFTkSuQmCC" },
        // Ful
        { id: 17, name: "bookBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEBSURBVEhLY4yaJvmfgV6AXpaB7GGCsukCRi2jCqCrZeCkvyzrOSOUjxPYMcj/Z2RgZEBNuv/AmBHo5v9AUpj9O8P6n6+wmkVSapTj+MNgLfCdgYv5H4MNlIZYxgC0CEK//ckFpnEBoi0TZ/vLoMvzk4GD6T+YNhX4CpWBAJCvlTh/QXnYAclx9gsYjvs/cDBIsDAwBIl9B4sxgyDzbwZurudgPi5AkmVf/v5jYAPGiKPADwYh1r8MrEA2EwMLONZ+/WVmuPlWEaoSOyDJso1v/jJIs/8Bs5/+ZAFjWGr4wfCTgRXOwwFGy0ZqgFHLqAJGLaMKGLWMKoCultGxRczAAACAQkfZkIDmNQAAAABJRU5ErkJggg==" },
        { id: 18, name: "vulnBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABrUlEQVQ4T2M8w8Dwn4GKgBFkoAkDAyM1zASZRT8DJ0w59v/4/j0MD29eY/j57QXDH77/DNx/JBnk1bUYwjMjGIJc1DB8heHC89ef/zfUlCTJ++dv//hvqMoB1oNiIMgwPnY+BmUlbpIM/PT+z/+7b/4wgAzFcOG9+9/+KylykWQgsh6skXLg2OX/1uZa8Ej//PEzw8dP3xg+fGdkUJYQZeDkQ9i3/+ARBjcne7gAhoFVuSv+t02OIMmFZcnT/3fNzcQMwxUrb4ITeES4OkkGglKDhKgwWB+GC0GSBTlWcAPj0tr/c7/4yfCOlQkeBCvX1qFYiKwHw8Cbtz7+lxTlZnjz4RfDo+d3GRYtPsQwb3o2hotB4SwvJcwgzC/GwCfIgjsMG9s3/q+v9Ecx4Pffv/9BEcPLzwt25cf3HxlERITgapIyp/2fNz0LMwxB6Wn+nD0M+aUeJIXhxO4d/119TBm0NIUJhyExBQYoMmERiTUdEpv99hw6/19ZTpxBUUEKdxiiuwiUCxgZPzDIyIqDpZ48fsnAz8fFICQkgDVY6Ft8ERN+6GrgLiRHMy49AJTC5vEf1NJpAAAAAElFTkSuQmCC" },
        { id: 19, name: "smokeCloudBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAISSURBVDhPrZXdSxRRGId/Z3Z2Z52ZnLVFosI13cp0CZHcclu2hD6goD/Di0UIwQvxIgSvuukfELoIuu4mUi90sbViyVWkUsLooi8lZEtd98vdM6cz27hgM5ta+8DhnBne8/Ce877DkCTAUEtqKTRcgrmuGYcSPnj0mN0fe8jCvdernko05wpPxydYd1cnQAgSb5fx4esqJMkJhyCU72Z+dhYbqdTvYBssGd65fYt8+bYGQSAIBs7Bd6wRlOrQdR2fVlbwbn7BjLTH9siJuQWkUj8hig4EO9qgut1Ib27h9UwctFQyo+yxFd6N9pHP/KjZTBaqLCN0vh0fl5bxY30djGdqjGrYCoPhCJuOxbC69h0lnlFuO4eWplPovXETZ862weP1mpFWyo3dzWfzuUwwfIUR6OiPRhHoCGB8chqyqqCuzs2L40ChkMcGv4KR4cE9+wxXFWGEFfI5aJqG0KUI4s9fQFZktPhb0exrgtagQVVVpLfSGOjvq+ytKrzQc5kVizt8JSCzmYHokiDx0eBthMdzlHcAIMsS/KdbMXpvaH9h18UeRilFdjsPWqS82k4o9RoWk/E9cX9iuGyLwt+jtMN7jzIcqffgpM+/r2wXizB09Vq5K3Sd4PiJZrxZfEVmpp4cSGZgERL+yblEBe+XkuRl/NmBRbtYhC6ngrlE7NCiCsZFmsv/5i9F+Xdq/AsAfgEAD7xI0n17IwAAAABJRU5ErkJggg==" },
        { id: 20, name: "darknessBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOdSURBVEhL7VZLiFxFFD1Vr169f3/G6ZnMjN1+yCB+IoQsXLgXAslGhQaFxm3Wbl0JElxmE3cuBJXBbEQQBUEQN+JCREVRsM0kmDdDJpNOume63+t55b23pxVcD72a01RX36pz76m6VXVp9dr1NYcFQcS+emsJHiJobeAwhaKP0SE8lcDqDL6xiEwdkdeENTU4Wl6FMY6qAtOjCR6WuxiWOSqy4ThGhak7oDYgrofKjfHSOyNoUVSOhDQJBvBVjX5HsBS4HrbRrl3AaLCDdXcFzWkXyfgi0slF1CYvo1l20ap6GA7+xuP1F9GMNmlRDQrqw1FMXqxWilogOxMxDSvfShn4OkHdb+NM8gzu5N9DDzt4oXWNdqWo0f49g1h6fWx7Mu8PN4W/mj6LwKS06JhELAz1PonOdAi8ba08EtOI/UewkV3AH7e+wKXHtvBoch4JBWaB7/I38e1eDz+oK9S/IXZMczzPvEudLfy2/Sk26ueR+qskktHuUort/yfm61QMTsFK+hR+7H+Ay53riLVCoj0K5uPLndcRbhwiW0lwOJhQH4v9+Z0uUppnXky7v9x5D7/0b2A9o0WaFgmQEKWUIWIGGWKzguX4LH7ub2E1ehrLdkVWXDMBbtzuUvCULsAR9m8PsDfKpR9PRkhbMT7heeIxf9m2cIb8f+p/jKXkSXiUEc4dY3ZmlL6aXZPUMV7tXJW0cfvwzx6CJWA42pc0D7EvHO7DIEFRHMj8R8Sb+7xC/ozftz+TuJ4KxRYxRSmoBev0y6GdnKN00uEbD5kfoojvUcAJrI2wc2uH6f8i384R2BTTaQHdLIUfkx/7t5PniOHkRs+PScQik6Cffy0DvbNXEfj0CKhd+7VLOa5o1OFwt0Spx8KZg+1hPqa35FC6h8K3vhbf3ua7wrmZfyOXjiFiqb+Gg8meDNiIrn/gSTuYDmTMK2M8cDTPqf9fvXmAu8AkoGEnfD+Y+duQzwoSN6DNMEQsNE0x+AnMiVFk4WVcTTT2hrs0q6RyCI5FnWxaYX90l6pMBNOoEJIf+3McjsfgW86YXRCqHgIKYEMj5FKPqMzQRbh/iEZ1Dk8UbyNza3MdaWzzeKN6Hvd270s6p+TH/hyHOQxDFYkhKpUrxWBYS/XEemiktJqCq4pGoW5SIetiY/o+lbTZA+WebR4v1F9yo91Yix/724B8j9W41goWVfVZ5zh/i8Gp2IngVOxEcCp2Ilio2AL/EQP/AJ3cKeF5w0+fAAAAAElFTkSuQmCC" },
        { id: 21, name: "auraBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8UExURVqWGUowCEcxF2MtEm89GQAAAYpUEJByNMSbPWtSH6uLNWgIBhYaHLQOJYMOKB0fKDMvOzlBRi8vMAAAAOORQ4kAAAAUdFJOU/////////////////////////8AT0/nEQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAKZJREFUKFPtz1ESgjAMRVEghCZpBdT979X32g6Oo+gGvB90hkObMnxtnETmI9W6iEwjbKJoa9GUuFaFVTLzhDS5J4+o2EzDDS8BfISHAWmkkAwsDH7Jpss800Cr5NhaJURydmxs5rJKxF7b8OUahlNpi3JE7NcaMTCgmeIGZe9E5MzUDXcrB3V8GvZ1QLSEi7Z57+aHmb3YrRT+IOx+1t8+98POGoYHDqQiNfdlnCkAAAAASUVORK5CYII=" },
        { id: 22, name: "sumRenewBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFySURBVEhL7ZY9S8NAGMf/l0svscqlL0pfaH3Byc0uRRc/gC5uiour6OCi+Amc3Vzc3cVP4C5IuzmIkwguFlSoNMl5SW8SJE8kZOovHJcnz4Uf98LDsb3LhkJOxLLrw1dm4j85P+uq4XeAz68RLq76ieN/E3ks857IYltiecHD0rzEycHqv1aDLFNKwQ8C+H6AIAhR9tzUQrIsEvh+JAQ+hh46nQ2ToUOSHR+dqoenLh5f1vH8toaRWoH0SiZLhyST5SpkqYzijIRwXf0Xw/tgYLJ0SLKS56FSqcbN0zOaKk6j17s3WTokWW2ugdpsHc16C61mW8c1cG6bLB3iAWH6NEILOLhtg1tcf0kPSeYWXTiuA8YZwlAfR83W5nbcp4EkE0LAFgUwNpbZwoaU0mTpJMpub+4U04sWPZZlwdJ75QhH99yMoJMoEwUR79V4ViGUbhFRvLuzn66K5FX1UxXiLJjIMmEiy4SJLBNyleV4IwZ+ALDtWoEhhDxUAAAAAElFTkSuQmCC" },
        { id: 23, name: "bookBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE4SURBVEhLY4yaJvmfgV6AXpaB7GGCsukCRrhlAgrq/wXkVP8LyKv9B7NBWFkTSIMwhA9VihcQ57P/ULMYGSE0EHCJ/QKS/4CY+PRFpGX/GHjk/jKwcIEMZ2Dgkf3NIGH9CsgC8WGYMCDKMg6h3wwa6Z8ZlMI+MyhHfmZQT/zM8OIoB1AG5ivifEeUZb+/szHcWcbD8OIwJ4Ok7TcGLunfQFEeiCQJgCjL/v5kYvhwnY1BPuALOPr+Ae3SK/kAlQUB4mKDKFWMzP8Z5Ly+MLDy/GP48Y6J4dayHwz///5nMGl6xyDt8h2kAqKQACDKMk6xv2AfnWsUYbg+TRAsdqxQgOF8qyDD20tgLlGAKMuUI39CWajg7282hh9veIHhSmTyHy2IqQFGLaMKGLWMKmDUMqoAOraIGRgAPHVjmZyhidQAAAAASUVORK5CYII=" },
    ]
};

export function getBuffImages() {
    return buffImages[localStorage.interfaceScalingDropdown];
};