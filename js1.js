

const userID = 161064

var currentDate = ''
var is_first = false;
if (!currentDate) {
    if (getCookie('currentDate') != null) {
        currentDate = getCookie('currentDate')
        delete_cookie('currentDate')
    } else {
        currentDate = moment().format('YYYY-MM-D')
    }
    is_first = true;
    //        var filters = "?schedule="+currentDate+"&sex=1,0,-1&level=0,1,2&type=match,cup"
    // 	location.href = "/f/"+filters
}
function showBanners() {
    home.$data.showBannerList = true
}
var home = new Vue({
    delimiters: ['[[', ']]'],
    el: '#app',
    data: {
        currentDate: '',
        checkedSex: [],
        checkedLevel: [],
        checkedType: [],
        checkedRegion: [],
        // checkedIno: [],
        // checkedPc: [],
        matchDays: [],
        currentMatches: [],
        currentMatchesNum: [],
        showFilterMy: false,
        showFilterMatch: false,
        showFilterMyStadiums: false,
        showRegion: false,
        showFavorite: true,
        isLoading: false,
        isFullLoading: false,
        currentRegions: [],
        mainBanners: [],
        now: moment().format(),
        allStadiums: [],
        myHiddenStadiums: [],
        myStadiums: [],
        checkedMyHiddenStadium: [],
        // threeDays: [],
        // threeDaysMatch: [],
        isCurrent: '',
        mainListBanners: [],
        randomListBanner: [],
        allRegions: [],
        noFilters: false,
        isAllChecked: [],
        selectRegion: null,
        showBounce: true,
        newStadiumToast: false,
        runBounce: false,
        allCheck: false,
        userLevel: null,
        userInfo: [],
        typeSearch: '',
        showBannerList: false
    },
    created: function () {
        this.currentDate = currentDate
        for (var i = 0; i < 14; i++) {
            var addDate = moment().add(i, 'days');
            var year = addDate.format('YYYY')
            var month = addDate.format('MM')
            var day = addDate.format('D')
            var weeks = ['일', '월', '화', '수', '목', '금', '토']
            var yoil = weeks[addDate.weekday()]
            var is_current = false
            if (this.currentDate == addDate.format('YYYY-MM-D')) { is_current = true }
            this.matchDays.push({
                year: year,
                month: month,
                day: day,
                yoil: yoil,
                is_current: is_current
            })
        }
        //
        if (''.length != 0) {
            this.checkedSex = ''.split(',')
        }
        if (''.length != 0) {
            this.checkedLevel = ''.split(',')
        }
        if (''.length != 0) {
            this.checkedType = ''.split(',')
        }
        if (''.length != 0) {
            this.selectRegion = ''.split(',')
        }
        if (''.length != 0) {
            this.typeSearch = ''.split(',')
        }

        // if (is_first == true) {
        //     this.checkedSex = [1,0,-1]
        //     this.checkedLevel = [0,1,2]
        //     this.checkedType = ['match','cup']
        // } else {
        //     this.checkedSex = ''.split(',')
        //     this.checkedLevel = ''.split(',')
        //     this.checkedType = ''.split(',')
        //     // this.checkedIno = ''.split(',')
        //     // this.checkedPc = ''.split(',')
        //     if('') {
        //         this.checkedRegion = ''.split(',')
        //     }
        // }
        if (this.checkedRegion.length == 0) {
            this.showFavorite = true
        } else {
            this.showFavorite = false
            this.showRegion = true
        }
        this.fetchMatches()
        this.fetchRegion()
        this.fetchDateSwipe()
        this.fetchMainListBanner()

        this.fetchUserInfo()


        this.isFullLoading = true;

        if (this.checkedSex.length == 0 && this.checkedLevel.length == 0 && this.checkedType.length == 0) {
            this.noFilters = true
        }
        this.newStadiumToast = true
        Array.prototype.move = function (from, to) {
            this.splice(to, 0, this.splice(from, 1)[0]);
        }
    },
    methods: {
        fetchDateSwipe() {
            var currentDateSlide = this.matchDays.findIndex(i => i.is_current == true)
            $(document).ready(function () {
                $('.swipe-tab').slick({
                    dots: false,
                    infinite: false,
                    arrows: true,
                    speed: 300,
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    swipeToSlide: true,
                    // focusOnSelect: true,
                    initialSlide: currentDateSlide,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                arrows: false
                            }
                        }
                    ]
                });
            });
        },
        fetchMainBanner() {
            var v = this
            axios.get('/api/v2/banners/?type=home', config)
                .then(function (res) {
                    v.mainBanners = res.data.results
                    v.swipeMainBanner()
                    console.log(v.mainBanners.length)
                    console.log(v.mainBanners)
                })
                .catch(function (err) { })
        },
        fetchMainListBanner() {
            var v = this
            axios.get('/api/v2/banners/?type=home_list', config)
                .then(function (res) {
                    v.mainListBanners = res.data.results
                    for (i = 0; i < v.mainListBanners.length; i++) {
                        Vue.set(v.mainListBanners[i], 'orderCondition', i * 15 + 15)
                    }
                })
                .catch(function (err) { })
        },
        swipeMainBanner() {
            $(document).ready(function () {
                $('.carousel--wrapper').slick({
                    dots: true,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: false,
                    customPaging: function (slider, i) {
                        var thumb = $(slider.$slides[i]).data();
                        return '<div class="dots-inner"><a onclick="showBanners()"><strong>' + (i + 1) + ' </strong> |' + slider.$slides.length + '</a></div>';
                    },
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '20px',
                                slidesToShow: 1
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '10px',
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            });
        },
        fetchRegion() {
            var v = this
            axios.get('/api/v2/areas/', config)
                .then(function (res) {
                    v.currentRegions = res.data.results
                    for (i = 0; i < v.currentRegions.length; i++) {
                        var regionVal = v.currentRegions[i].id
                        v.allRegions.push(regionVal)
                    }
                    v.currentRegions.move(2, 1)
                    v.currentRegions.move(5, 2)
                    v.currentRegions.move(5, 3)
                    v.currentRegions.move(5, 7)
                    v.allRegions.move(2, 1)
                    v.allRegions.move(5, 2)
                    v.allRegions.move(5, 3)
                    v.allRegions.move(5, 7)
                })
                .catch(function (err) { })
        },
        fetchMatches(regionId) {
            var v = this;
            v.isLoading = true
            if (regionId !== undefined) {
                v.selectRegion = regionId
            }
            axios.get('/api/v2/matches/' + this.getFilters(), config)
                .then(function (res) {
                    v.isLoading = false
                    v.isFullLoading = false
                    v.fetchMainBanner()
                    v.currentMatches = res.data

                    var a = 0
                    for (i = 0; i < v.currentMatches.results.length; i++) {
                        if (v.currentMatches.results[i].schedule > v.now) {
                            a++
                        }
                    }
                    v.currentMatchesNum = a
                    setTimeout(() => v.newStadiumToast = false, 2000);
                    v.runBounce = true
                })
                .catch(function () {
                })
        },
        switchRegion(val) {
            if (val == 'myStad') {
                this.checkedRegion = []
                this.showFavorite = true
                this.showRegion = false
            } else if (val == 'allRegion') {
                this.checkedRegion = this.allRegions
                this.showRegion = true
                this.showFavorite = false
            } else if (val == 'isDefault') {
                if (this.checkedRegion.length == 0) {
                    this.checkedRegion = this.allRegions
                }
                this.showRegion = true
                this.showFavorite = false
            }
        },
        dateMatches: function (getDate, index) {
            this.currentDate = getDate
            this.fetchMatches()
            var beforeCurrent = this.matchDays.findIndex(i => i.is_current == true)

            this.matchDays[beforeCurrent].is_current = false
            this.matchDays[index].is_current = true
        },
        filterMatches: function () {
            location.href = "/f/" + this.getFilters()
        },
        getFilters() {
            // this.typeSearch = document.getElementById("searchId").value
            var paramSex = "&sex="
            var paramLevel = "&level="
            var paramType = "&type="
            var paramRegion = "&region="
            var paramSearch = "&search="
            var regionValue = this.selectRegion
            if (this.checkedSex.length === 0) {
                paramSex = ''
            }
            if (this.checkedLevel.length === 0) {
                paramLevel = ''
            }
            if (this.checkedType.length === 0) {
                paramType = ''
            }
            if (this.selectRegion == null) {
                regionValue = 'me'
            }
            if (this.typeSearch == null || this.checkedLevel.length === 0) {
                paramSearch = ''
            }
            return "?sch=" + this.currentDate + paramSex + this.checkedSex + paramLevel + this.checkedLevel + paramType + this.checkedType + paramSearch + this.typeSearch + paramRegion + regionValue + '&page_size=300&ordering=schedule'
        },
        fetchStadiums() {
            var v = this
            v.checkedMyHiddenStadium = []
            v.myStadiums = []
            axios.all([
                axios.get('/api/region/stadiums/', config),
                axios.get('/api/v2/users/me/stadiums/?page_size=150', config)
            ])
                .then(axios.spread((resAll, resFav) => {
                    v.allStadiums = resAll.data.results
                    v.myHiddenStadiums = resFav.data.results

                    for (i = 0; i < v.myHiddenStadiums.length; i++) {
                        var hiddenStadiumId = v.myHiddenStadiums[i].stadium_id
                        v.checkedMyHiddenStadium.push(hiddenStadiumId)
                    }

                    for (i = 0; i < v.allStadiums.length; i++) {
                        Vue.set(v.allStadiums[i], 'isAll', true)
                        for (f = 0; f < v.allStadiums[i].stadium_list.length; f++) {
                            var stadiumId = v.allStadiums[i].stadium_list[f].id
                            v.myStadiums.push(stadiumId)
                            if (v.checkedMyHiddenStadium.includes(stadiumId)) {
                                v.allStadiums[i].isAll = false
                            }
                        }
                    }

                    for (i = 0; i < v.checkedMyHiddenStadium.length; i++) {
                        v.myStadiums.splice(v.myStadiums.indexOf(v.checkedMyHiddenStadium[i]), 1)
                    }
                    console.log(v.myStadiums)

                    v.allStadiums.move(2, 1)
                    v.allStadiums.move(5, 2)
                    v.allStadiums.move(5, 3)
                    v.allStadiums.move(5, 7)
                }))
        },
        allCheckStad(areaGroup, status) {
            if (status == 'allCheck') {
                for (i = 0; i < this.allStadiums[areaGroup].stadium_list.length; i++) {
                    var stadiumId = this.allStadiums[areaGroup].stadium_list[i].id
                    if (this.myStadiums.includes(stadiumId) == false) {
                        this.myStadiums.push(stadiumId)
                        this.checkedMyHiddenStadium.splice(this.checkedMyHiddenStadium.indexOf(stadiumId), 1)
                    }
                }
            } else if (status == 'allUncheck') {
                for (i = 0; i < this.allStadiums[areaGroup].stadium_list.length; i++) {
                    var stadiumId = this.allStadiums[areaGroup].stadium_list[i].id
                    if (this.checkedMyHiddenStadium.includes(stadiumId) == false) {
                        this.checkedMyHiddenStadium.push(stadiumId)
                        this.myStadiums.splice(this.myStadiums.indexOf(stadiumId), 1)
                    } else {
                        this.myStadiums.splice(this.myStadiums.indexOf(stadiumId), 1)
                    }

                }
            }

        },
        pushHiddenStadium(val) {
            if (this.checkedMyHiddenStadium.indexOf(val) == -1) {
                this.checkedMyHiddenStadium.push(val)
            } else {
                this.checkedMyHiddenStadium.splice(this.checkedMyHiddenStadium.indexOf(val), 1)
            }
        },
        saveFavorite() {
            var v = this
            var transStadiumID = v.checkedMyHiddenStadium.join(',')

            axios.post('/api/v2/users/me/stadiums/', {
                stadium_id: transStadiumID
            }, config)
                .then(function (res) {
                    v.checkedMyHiddenStadium = []
                    v.myStadiums = []
                    v.showFilterMyStadiums = false
                    v.isAllChecked = []
                    v.filterMatches()
                })
                .catch(function () {

                })
        },
        matchTime(getTime) {
            var startTime = moment(getTime).format('kk:mm')
            return startTime
        },
        goToMatch(match_id) {
            document.cookie = "currentDate=" + this.currentDate
            var url = "/match/";
            document.location.href = url + match_id
        },
        fetchUserInfo() {
            const v = this
            axios.get('/api/v2/users/me/', config)
                .then(function (res) {
                    v.userInfo = res.data
                    console.log(v.userInfo)
                    if (v.userInfo.levels.length != 0) {
                        let userLevels = 0
                        for (i = 0; i < v.userInfo.levels.length; i++) {
                            userLevels = userLevels + v.userInfo.levels[i].level
                        }
                        v.userLevel = userLevels / v.userInfo.levels.length
                    } else {
                        v.userLevel = v.userInfo.level
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    },
    watch: {
        showFilterMatch() {
            if (this.showFilterMatch) {
                document.body.style.overflow = 'hidden'
                return
            }
            document.body.style.overflow = 'auto'
        },
        showFilterMyStadiums() {
            if (this.showFilterMyStadiums) {
                document.body.style.overflow = 'hidden'
                return
            }
            document.body.style.overflow = 'auto'
        },
        showBannerList() {
            if (this.showBannerList) {
                document.body.style.overflow = 'hidden'
                return
            }
            document.body.style.overflow = 'auto'
        }
    },
    computed: {
    }
});

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function delete_cookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
</script >


    <script>
        new Vue({
            delimiters: ["[[", "]]"],
        el:'#tprApp',
        data: {
            myFavorite: null,
        times: [
        {
            'label': '06:00',
        'value': 6,
        'type': 0
                },
        {
            'label': '08:00',
        'value': 8,
        'type': 1
                },
        {
            'label': '10:00',
        'value': 10,
        'type': 1
                },
        {
            'label': '12:00',
        'value': 12,
        'type': 1
                },
        {
            'label': '14:00',
        'value': 14,
        'type': 1
                },
        {
            'label': '16:00',
        'value': 16,
        'type': 1
                },
        {
            'label': '18:00',
        'value': 18,
        'type': 2
                },
        {
            'label': '20:00',
        'value': 20,
        'type': 2
                },
        {
            'label': '22:00',
        'value': 22,
        'type': 2
                },
        {
            'label': '24:00',
        'value': 24,
        'type': 3
                },
        {
            'label': '02:00',
        'value': 2,
        'type': 3
                },
        {
            'label': '04:00',
        'value': 4,
        'type': 3
                },
        ],
        selectTimes: [],
        selectHoliTimes: [],
        regions: [],
        districts: [],
        selectRegion: 0,
        selectDistrict: 0,
        distance: [
        {
            'value': '10',
        'desc': '🚌 대중교통 30분, 🚗 자동차 10분 미만'
                },
        {
            'value': '20',
        'desc': '🚌 대중교통 1시간, 🚗 자동차 30분'
                },
        {
            'value': '30',
        'desc': '🚌 대중교통 1시간 30분, 🚗 자동차 1시간'
                },
        {
            'value': '40',
        'desc': '🚌 대중교통 2시간, 🚗 자동차 1시간 30분'
                },
        ],
        selectDistance: [],
        currentDesc: '풋살하러 어디까지 갈 수 있나요?',
        showFavoriteModal: false
        },
        created() {
            this.fetchRegions()
            this.fetchFavorite()
        },
        methods: {
            fetchFavorite() {
            v = this
                axios.get('/api/v2/users/me/favorite/', config)
        .then(function(res) {
                    if(res.data.results.length == 0) {
            v.showFavoriteModal = true
        } else if(res.data.results.length != 0) {
            v.myFavorite = res.data.results[0]
                        if(v.myFavorite.times.length != 0) {
                            for(i=0; i < v.myFavorite.times.length; i++) {
                                if(v.myFavorite.times[i].is_holiday == true) {
            v.selectHoliTimes.push(v.myFavorite.times[i].time)
        } else {
            v.selectTimes.push(v.myFavorite.times[i].time)
        }
                            }
                        }
        if(v.myFavorite.districts.length !=0) {
            v.selectRegion = v.myFavorite.districts[0].region_id
                            v.fetchDistricts(v.selectRegion)
        v.selectDistrict = v.myFavorite.districts[0].district_id
                        }
        v.selectDistance = v.myFavorite.radius
        for(i=0; i < v.distance.length; i++) {
                            if(v.distance[i].value == v.selectDistance) {
            v.currentDesc = v.distance[i].desc
        }
                        }
        if(v.myFavorite.is_auto == true) {
            v.showFavoriteModal == true
        }
                    } else {
            v.showFavoriteModal = false
        }
                })
            },
        fetchRegions() {
            v = this
                axios.get('/api/v2/regions/', config)
        .then(function(res){
            v.regions = res.data.results
        })
            },
        fetchDistricts(ids) {
            v = this
                if(event.target.value != undefined) {
            let regionId = event.target.value
        axios.get('/api/v2/regions/'+regionId+'/districts/', config)
        .then(function(res) {
            v.districts = res.data
        })
                } else if(ids != undefined) {
            axios.get('/api/v2/regions/' + ids + '/districts/', config)
                .then(function (res) {
                    v.districts = res.data
                })
        }
            },
        postFavorite() {
            v = this
                if(this.selectDistance.length == 0) {
            alert('이동 거리를 선택해주세요')
        } else if (this.selectDistrict == 0) {
            alert('지역을 선택해주세요')
        } else if (this.selectTimes.length == 0) {
            alert('평일 선호 시간을 선택해주세요')
        } else if (this.selectHoliTimes.length == 0) {
            alert('주말/휴일 선호 시간을 선택해주세요')
        } else {
            axios.post('/api/v2/users/me/favorite/', {
                radius: v.selectDistance,
                districts: [v.selectDistrict],
                times: v.selectTimes,
                holiday_times: v.selectHoliTimes
            }, config)
                .then(function (res) {
                    v.showFavoriteModal = false
                    alert('감사합니다. 플랩과 함께 행복풋살 하세요!')
                })
        }
            },
        footNote(index) {
            this.currentDesc = this.distance[index].desc
        }
        },
        watch: {

        }
    })
    </script>




    <div id="footer">
        <div class="footerWrap">

            <div class="footerNav">
                <ul>
                    <h3>매치</h3>
                    <li>
                        <a href="/">모든 매치</a>
                    </li>
                    <li>
                        <a href="/explore/1/matches/">여성 매치</a>
                    </li>
                    <li>
                        <a href="/explore/2/matches/">남녀모두 매치</a>
                    </li>
                    <li>
                        <a href="/explore/22/matches/">초급 매치</a>
                    </li>
                    <li>
                        <a href="/explore/3/matches/">중급 매치</a>
                    </li>
                </ul>
                <ul class="footerDul">
                    <h3>서비스 지역</h3>
                    <li>
                        <a href="/region/1/matches/">서울</a>
                    </li>
                    <li>
                        <a href="/region/3/matches/">경기</a>
                    </li>
                    <li>
                        <a href="/region/8/matches/">인천</a>
                    </li>
                    <li>
                        <a href="/region/7/matches/">대전·충청</a>
                    </li>
                    <!-- <li>
                        <a href="/region/13/matches/">충북</a>
                    </li> -->
                    <li>
                        <a href="/region/2/matches/">대구·경북</a>
                    </li>
                    <li>
                        <a href="/region/11/matches/">울산</a>
                    </li>
                    <li>
                        <a href="/region/10/matches/">부산</a>
                    </li>
                    <li>
                        <a href="/region/6/matches/">광주</a>
                    </li>
                </ul>
                <ul>
                    <h3>플랩풋볼</h3>
                    <li>
                        <a href="/about/">플랩풋볼 소개</a>
                    </li>
                    <li>
                        <a href="/manager/apply/">매니저 지원</a>
                    </li>
                    <li>
                        <a href="https://www.notion.so/LET-S-PLAB-4718d190580047e6ab6ecb34a0dac215">채용</a>
                    </li>
                    <li>
                        <a href="/cs/6/topics/">공지사항</a>
                    </li>
                    <li>
                        <a href="/cs/">자주 묻는 질문</a>
                    </li>
                    <li>
                        <a href="http://pf.kakao.com/_xmxhlAC">1:1 문의</a>
                    </li>
                </ul>
                <ul>
                    <h3>소셜 미디어</h3>
                    <li>
                        <a href="https://www.instagram.com/plabfootball/" target="_blank">인스타그램</a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/plabfootball/?eid=ARCbIV7J0pdkC-eNTR8kOKz3Ce0WYjnpR9McmLlOQheslzEURQrjx5wYdcwv0SAVs3DofNPxG6_iaY_f" target="_blank">페이스북</a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/groups/plabfootball/" target="_blank">페이스북 그룹</a>
                    </li>
                </ul>
            </div>
            <div class="company">
                <h2><a href="/">plabfootball.com</a></h3>
                <p>풋살하고 싶을 땐, 플랩풋볼</p>
                <span><a href="/term/">이용 약관 | </a><a href="/privacy/">개인정보 처리방침 | </a><a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=6508100575">사업자 정보 확인</a></span><br>
                    <span>플랩풋볼 | 서울특별시 마포구 잔다리로31 제우피스빌딩 2층 | contact@plabfootball.com</span>
                    <span>주식회사 마이플레이컴퍼니 | 사업자번호 650-81-00575 | 대표 강동규 | 통신판매업 신고 2020-서울마포-4411</span>
                    <span class="copyright">Copyright <b>PLAB</b> All rights reserved.</span>
    </div>
            </div>
        </div>

        <script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
        <script type="text/javascript">
            if(!wcs_add) var wcs_add = { };
            wcs_add["wa"] = "s_20e1b24b5244";
            if(!_nasa) var _nasa={ };
            wcs.inflow('plabfootball.com');
            wcs_do(_nasa);
        </script>

        <script type="application/ld+json">
            {
                "@context": "http://schema.org",
            "@type": "Person",
            "name": "플랩풋볼",
            "url": "https://plabfootball.com",
            "sameAs": [
            "https://www.instagram.com/plabfootball/",
            "https://www.facebook.com/plabfootball/?eid=ARCbIV7J0pdkC-eNTR8kOKz3Ce0WYjnpR9McmLlOQheslzEURQrjx5wYdcwv0SAVs3DofNPxG6_iaY_f",
            "https://blog.naver.com/plabfootball"
            ]
}
        </script>
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://plabfootball.com.com",
            "logo": "https://plab-football.s3.amazonaws.com/static/img/logo.svg",
            "contactPoint": [{
                "@type": "ContactPoint",
            "telephone": "+82-2-704-7983",
            "contactType": "고객센터"
  }]
}
        </script>

    </div>

    <script>
        var is_coupon_event = 0;

        var headerApp = new Vue ({
            delimiters: ['[[', ']]'],
        el: '#userMenu',
        data: {
            baseUser:[],
        myMatches: [],
        waitReviews: false
          },
        created() {
            moment.locale('ko')
            
              this.fetchBaseUser()
        this.fetchApplys()
            
          },
        methods: {
            fetchBaseUser() {
                var v = this
        axios.get('/api/v2/users/me/', config)
        .then(function(res) {
            v.baseUser = res.data
        })
        .catch(function(err) { })
            },
        fetchApplys() {
                const v = this
        axios.get('/api/v2/users/me/applys/', config)
        .then(function(res) {
            v.myMatches = res.data.results
                    for(i=0; i<v.myMatches.length; i++) {
                      if(v.myMatches[i].status == 'CONFIRM' && v.myMatches[i].schedule < moment().format() && v.myMatches[i].schedule > moment().subtract(3, 'days').format() && v.myMatches[i].review == null) {
            v.waitReviews = true
        }
                    }
                    setTimeout(() => v.waitReviews = false, 6000);
                })
        .catch(function(err) {
        })
            }
          }
        })

        window.Clipboard = (function(window, document, navigator) {
            var textArea,
        copy;
        function isOS() {
                return navigator.userAgent.match(/ipad|iphone/i);
            }
        function createTextArea(text) {
            textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
            }
        function selectText() {
                var range,
        selection;
        if (isOS()) {
            range = document.createRange();
        range.selectNodeContents(textArea);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
                } else {
            textArea.select();
                }
            }
        function copyToClipboard() {
            document.execCommand('copy');
        document.body.removeChild(textArea);
            }
        copy = function(text) {
            createTextArea(text);
        selectText();
        copyToClipboard();
            };
        return {
            copy: copy
            };
        })(window, document, navigator);
    </script>

    <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
    <script type="text/javascript">
        var modalRegist = document.getElementById("modalRegist");
        var modalLogin = document.getElementById("modalLogin");
        var openRegist = document.getElementById("regist");
        var openLogin = document.getElementById("login");
          // var closeRegist = document.getElementById("closeRegist");
          // const inputSearch = document.getElementById("searchId");
          // function getSearch() {
            //   const inputSearchVal = inputSearch.value;
            //   console.log(inputSearchVal)
            // }
            // inputSearch.addEventListener("keyup", function(event) {
            //   if (event.keyCode === 13) {
            //     event.preventDefault();
            //     document.getElementById("searchBtn").click();
            //   }
            // });

            window.onclick = function (event) {
                if (event.target == modalRegist) {
                    modalRegist.style.display = "none";
                    hiddenScroll.style.overflow = "inherit";
                }
                else if (event.target == modalLogin) {
                    modalLogin.style.display = "none";
                    hiddenScroll.style.overflow = "inherit";
                }
            }

          var hiddenScroll = document.body;

        function openKakaoRegist(is_event=0) {
            is_coupon_event = is_event
            modalRegist.style.display = "block";
        hiddenScroll.style.overflow = "hidden";
          }

        function openKakaoLogin() {
            modalLogin.style.display = "block";
        hiddenScroll.style.overflow = "hidden";
          }

        Kakao.init('865f4b3b9dc06d856cd4dac8406f5c2c');

        function pressedLoginKakao(kakao_type='check', cash=0, redirect_uri=null) {
            Kakao.Auth.login({
                success: function (authObj) {

                    access_token = authObj['access_token']
                    Kakao.Auth.setAccessToken(access_token);

                    getKakaoAccount(kakao_type, cash, redirect_uri);

                },
                fail: function (err) {
                    console.log(err)
                }
            });
        }

        function getKakaoAccount(kakao_type, cash=0, redirect_uri=null) {

            Kakao.API.request({
                url: '/v2/user/me',
                success: function (res) {
                    // json = JSON.stringify(res)
                    var kakao_id = res['id']

                    $.ajax({
                        type: "POST",
                        url: "/kakao_sync/",
                        data: {
                            'json': JSON.stringify(res),
                            'kakao_type': kakao_type,
                            'cash': cash,
                            'csrfmiddlewaretoken': 'YG0cPSxrwEYbDKzRLqGJVmSDC0JkshNugI6RjHLP36quHCJfUXscE2Ee8iYSVyWg',
                            'is_coupon_event': is_coupon_event,
                        },
                        dataType: "json",
                        success: function (response) {

                            if (redirect_uri != null) {
                                location.href = redirect_uri;
                                return
                            }

                            var type = response.type

                            if (type == 'kakao') {
                                location.href = "/"
                            } else if (type == 'email') {
                                location.href = "/kakao_sync/"
                            } else if (type == 'regist') {
                                location.href = "/auth/register/complete"
                            } else if (type == 'sync_login') {
                                location.href = "/accounts/login/"
                            } else if (type == 'home') {
                                location.href = "/"
                            } else if (type == 'exist_user') {
                                alert('이미 가입 하셨습니다')
                                location.href = "/mypage/"
                            } else {

                            }
                        }
                    })
                },
                fail: function (error) {
                    console.log(error)
                }
            });
        }

        function pressedLoginKakao2() {

          var base_url = "https://plabfootball.com"
        var oauth_url = base_url+"/oauth"
        var client_id = "865f4b3b9dc06d856cd4dac8406f5c2c"

        location.href = "https://kauth.kakao.com/oauth/authorize?client_id="+client_id+"&redirect_uri="+oauth_url+"&response_type=code"
        }

