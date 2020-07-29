import { Request, Response } from 'express';
import { parse } from 'qs';

function getillCase(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }
  const { id = -1 } = req.query;
  const params = parse(realUrl, true).query as unknown;
  if (id == -1) {
    const result = {
      code: 4056,
    };
    return res.json(result);
  }

  const result = {
    code: 200,
    data: {
      BloodBio: [],
      BloodRoutine: [],
      Coagulation: [],
      Cytokines: [],
      DetailTrePlan: [],
      FollInfo: [],
      ImageExams: [],
      Immunohis: [
        {
          ALKD5F3: null,
          ALKD5F3N: null,
          CAIX: null,
          CAM52: null,
          CD10: null,
          CD117: null,
          CD34: null,
          CD56: null,
          CDX2: null,
          CEA: null,
          CK: null,
          CK19: null,
          CK20: null,
          CK56: null,
          CK7: null,
          CK818: 2,
          CgA: null,
          Cyn: null,
          DLL3: null,
          EMA: null,
          ERCC1: null,
          LCA: null,
          MCM2: null,
          NapsinA: null,
          P16: null,
          P40: null,
          P63: null,
          PAX2: null,
          PAX8: null,
          PCK: null,
          PDL1: null,
          RRM1: null,
          SATB2: null,
          Syn: null,
          TTF1: null,
          VEGFC: null,
          Villin: 2,
          Villinco: null,
          id: 2,
          other: null,
          p53: null,
          pid: 1,
          treNum: 0,
        },
      ],
      IniDiaPro: [
        {
          Ki67: null,
          PSScore: 0,
          TSize: null,
          bioMet: '',
          cStage: null,
          cliStage: null,
          cliniManifest: null,
          comCar: null,
          firVisDate: null,
          id: 1,
          massSize: null,
          mitIma: null,
          necArea: null,
          pStage: null,
          part: '',
          patDia: '',
          patNum: null,
          patReDate: null,
          patStage: null,
          pid: 16,
          pleInv: null,
          speSite: null,
          stage: null,
          traSite: '',
          videography: null,
        },
      ],
      Lung: [],
      LymSubsets: [],
      MoleDetec: [
        {
          ALK: null,
          ALKDesc: null,
          ALKDetMed: null,
          ALKSam: null,
          BIM: 0,
          BIMDesc: null,
          BIMDetMed: null,
          BIMSam: null,
          BRAF: 1,
          BRAFDesc: null,
          BRAFDetMed: 2,
          BRAFSam: '1',
          EGFR: null,
          EGFRDesc: null,
          EGFRDetMed: null,
          EGFRSam: null,
          HER_2: null,
          HER_2Desc: null,
          HER_2DetMed: null,
          HER_2Sam: null,
          HER_2_co: null,
          HER_2_coDesc: null,
          HER_2_coDetMed: null,
          HER_2_coSam: null,
          MSI: null,
          PDL1: 1,
          PIK3CA: null,
          PIK3CADesc: null,
          PIK3CADetMed: null,
          PIK3CASam: null,
          RET: null,
          RETDesc: null,
          RETDetMed: null,
          RETSam: null,
          ROS1: null,
          ROS1Desc: null,
          ROS1DetMed: null,
          ROS1Sam: null,
          TMB: null,
          UGT1A1: null,
          UGT1A1Desc: null,
          UGT1A1DetMed: null,
          UGT1A1Sam: null,
          cMET: null,
          cMETDesc: null,
          cMETDetMed: null,
          cMETSam: null,
          id: 2,
          path: 'static/16/icon_48.png,static/16/icon_16.png',
          pid: 1,
          treNum: null,
        },
      ],
      MyocardialEnzyme: [],
      OneToFive: [], //1-5线
      OtherExams: [], //其他
      Patient: [
        {
          account: ',54,',
          birthday: 'Thu, 16 Jul 2020 00:00:00 GMT',
          gender: '1',
          hospitalNumber: '12331211',
          id: 3,
          idNumber: '123456200001012234',
          patientName: 'test3',
          phoneNumber1: 12441355,
          phoneNumber2: null,
          researchCenter: ',17,',
          updateTime: null,
        },
      ],
      Radiotherapy: [
        {
          treNum: 1, //第一条记录
          begDate: null,
          dosUnit: false,
          endDate: null,
          radDose: 'yity',
          radSite: null,
          trement: 7,
        },
        {
          treNum: 1, //第一条记录
          begDate: null,
          dosUnit: false,
          endDate: null,
          radDose: 'yity',
          radSite: null,
          trement: 7,
        },
      ], //放疗
      SideEffect: [],
      Signs: [],
      Surgery: [], //手术
      Thyroid: [],
      TreRec: [
        {
          beEffEva: 3,
          beEffEvaDate: '2020-07-14',
          proDate: '2020-07-07',
          proDes: 'wetew',
        },
      ],
      TumorMarker: [],
      UrineRoutine: [],
      pastHis: [
        {
          basDisHis: null,
          drink: false,
          drinkingHis: null,
          drug: true,
          drugUseHis: [
            {
              drugDose: '1g',
              drugName: '\u836f\u72691',
              duration: '1',
              key: 0,
            },
            {
              drugDose: '3g',
              drugName: '123',
              duration: '3',
              key: 1,
            },
          ],
          hormone: true,
          hormoneUseHis: [
            {
              drugDose: '2g',
              drugName: '123',
              duration: '1',
              key: 0,
            },
            {
              drugDose: '1g',
              drugName: '123',
              duration: '2',
              key: 1,
            },
          ],
          id: 4,
          infDisHis: '无',
          pid: 3,
          smoke: true,
          smokingHis: {
            smokeDayAvg: 1,
            smokeYearAvg: 1,
            stopSmoke: 1,
          },
          tumFamHis: null,
          tumHis: '大肠癌,鼻咽癌及头颈部肿瘤',
          tumor: true,
          tumorFam: false,
        },
      ],
    },
    msg: '病例的全部信息',
  };
  return res.json(result);
}

export default {
  'GET /api/illCase/allinfo/find': getillCase,
};
